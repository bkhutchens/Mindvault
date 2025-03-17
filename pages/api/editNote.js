import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { id, summary, tags } = req.body;

  try {
    const updatedNote = await prisma.note.update({
      where: { id },
      data: { 
        summary, 
        tags: tags.join(",")
      },
    });

    // CLEAR FIX HERE (explicitly ensure tags returned as string, then convert clearly)
    const tagsArray = typeof updatedNote.tags === "string"
      ? updatedNote.tags.split(",").map(tag => tag.trim())
      : updatedNote.tags;

    updatedNote.tags = tags.length ? tagsArray : [];

    return res.status(200).json({ note: updatedNote });
  } catch (error) {
    console.error("Update error clearly:", error);
    return res.status(500).json({ error: "Failed to update note." });
  }
}
