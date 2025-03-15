import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "PUT") return res.status(405).json({ error: "Method not allowed" });

  const { id, summary, tags } = req.body;

  try {
    const updatedNote = await prisma.note.update({
      where: { id },
      data: { summary, tags },
    });
    return res.status(200).json({ note: updatedNote });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ error: "Failed to update note." });
  }
}
