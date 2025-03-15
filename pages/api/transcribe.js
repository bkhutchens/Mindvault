import OpenAI from "openai";
import fs from "fs";
import { IncomingForm } from "formidable";
import { PrismaClient } from "@prisma/client";

export const config = { api: { bodyParser: false } };

const prisma = new PrismaClient();

const approvedTags = [
  "Project", "Notes", "Reminder", "Idea", "Task",
  "Meeting", "Question", "Personal", "Work", "List", "Event"
];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = new IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Form parsing failed" });

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

      const tagPrompt = `
      Select up to 3 relevant tags from this list: ${approvedTags.join(", ")}.
      Note: "${transcription}"
      `;

      const tagResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Return exactly 3 tags from provided list, comma-separated." },
          { role: "user", content: tagPrompt },
        ],
        temperature: 0,
        max_tokens: 30,
      });

      const tags = tagResponse.choices[0].message.content
        .split(",")
        .map(t => t.trim());

      const summaryResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Summarize the following transcription concisely in one sentence using provided tags as context.",
          },
          {
            role: "user",
            content: `Tags: ${tags.join(", ")}\nTranscription: ${transcription}`,
          },
        ],
        temperature: 0.3,
        max_tokens: 60,
      });

      const summary = summaryResponse.choices[0].message.content.trim();

      const note = await prisma.note.create({
        data: { 
          transcription, 
          tags, 
          summary 
        },
      });

      return res.status(200).json({ note });
    } catch (error) {
      console.error("Transcription or summarization error:", error);
      return res.status(500).json({ error: "Transcription or summary failed." });
    }
  });
}
