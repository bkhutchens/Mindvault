import { PrismaClient } from "@prisma/client";
import OpenAI from "openai";
import { IncomingForm } from "formidable";
import fs from "fs";

export const config = {
  api: { bodyParser: false },
};

const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const form = new IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parsing error:", err);
      return res.status(500).json({ error: "Form parsing failed." });
    }

    const audioFilePath = files.file[0].filepath;  // <-- clearly corrected here
    const audioStream = fs.createReadStream(audioFilePath);

    try {
      const transcriptionResponse = await openai.audio.transcriptions.create({
        file: audioStream,
        model: "whisper-1",
      });

      const transcription = transcriptionResponse.text.trim();

      const tagsResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Provide 1-3 tags from: Project,Notes,Reminder,Idea,Task,Meeting,Question,Personal,Work,List,Event" },
          { role: "user", content: transcription },
        ],
      });

      const tags = tagsResponse.choices[0].message.content.trim().split(",").map(tag => tag.trim());

      const summaryResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Summarize the transcription concisely:" },
          { role: "user", content: transcription },
        ],
      });

      const summary = summaryResponse.choices[0].message.content.trim();

      // Correct final API route clearly:
const note = await prisma.note.create({
  data: {
    transcription,
    tags: tags.join(","),
    summary,
  },
});

note.tags = note.tags.split(","); // explicitly convert tags back to array clearly

return res.status(200).json({ note });


      res.status(200).json({ note });
    } catch (error) {
      console.error("Transcription or tagging failed:", error);
      res.status(500).json({ error: "Transcription or summarization failed." });
    } finally {
      fs.unlinkSync(audioFilePath); // cleanup temp file
    }
  });
}
