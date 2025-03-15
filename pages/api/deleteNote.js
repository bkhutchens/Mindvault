import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "DELETE") return res.status(405).json({ error: "Method not allowed" });

  const { id } = req.body;

  try {
    await prisma.note.delete({ where: { id } });
    return res.status(200).json({ message: "Note deleted successfully." });
  } catch (error) {
    console.error("Deletion error:", error);
    return res.status(500).json({ error: "Failed to delete note." });
  }
}