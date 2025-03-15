import OpenAI from "openai";
import fs from "fs";
import { IncomingForm } from "formidable";

export const config = { api: { bodyParser: false } };

// Your approved tags:
const approvedTags = [
  "Project", "Notes", "Reminder", "Idea", "Task", "Meeting",
  "Question", "Personal", "Work", "List", "Event"
];

let notes = [];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = new IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parsing error:", err);
      return res.status(500).json({ error: "Form parsing failed" });
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error("Missing API key");
      return res.status(500).json({ error: "Missing API key" });
    }

    try {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      const audioFile = fs.createReadStream(files.file[0].filepath);
      const transcriptionResponse = await openai.audio.transcriptions.create({
        file: audioFile,
        model: "whisper-1",
      });

      const transcription = transcriptionResponse.text;

      // Clearly generate tags
      const tagPrompt = `
      Available Tags: ${approvedTags.join(", ")}
      Note: "${transcription}"

      Select clearly up to 3 relevant tags from above, separated by commas.
      `;

      const tagResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Choose up to 3 tags from the provided list that best describe the note." },
          { role: "user", content: tagPrompt },
        ],
        temperature: 0,
        max_tokens: 30,
      });

      const tags = tagResponse.choices[0].message.content
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => approvedTags.includes(tag));

      // ✅ New Summary Generation (after tags):
      const summaryPrompt = `
        Summarize the following note clearly in 1-2 short sentences. Use the provided tags (${tags.join(", ")}) as context:

        Note:
        "${transcription}"
      `;

      const summaryResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Summarize notes concisely based on tags provided." },
          { role: "user", content: summaryPrompt },
        ],
        temperature: 0.1,
        max_tokens: 60,
      });

      const summary = summaryResponse.choices[0].message.content.trim();

      // Final note structure:
      const note = {
        id: Date.now().toString(),
        transcription,
        tags,
        summary,
        createdAt: new Date().toISOString(),
      };

      return res.status(200).json({ note });
    } catch (error) {
      console.error("Transcription or summarization error:", error);
      return res.status(500).json({ error: "Transcription or summary failed." });
    }
  });
};
