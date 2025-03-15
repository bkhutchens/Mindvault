import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const notes = await prisma.note.findMany({ orderBy: { createdAt: "desc" } });

  res.status(200).json({ notes });
}
