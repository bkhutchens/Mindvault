import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // 1. Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });

  // 2. If user does not exist, create them
  if (!existingUser) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      return res.status(200).json({ user });
    } catch (error) {
      console.error("Registration error:", error);
      return res.status(500).json({ error: "Failed to register user" });
    }
  }

  // 3. If user exists but has NO password, unify by setting a password
  if (existingUser && !existingUser.password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.update({
        where: { email },
        data: {
          name,
          password: hashedPassword,
        },
      });
      return res.status(200).json({ user, message: "Password set for existing user." });
    } catch (error) {
      console.error("Update existing user error:", error);
      return res.status(500).json({ error: "Failed to update existing user" });
    }
  }

  // 4. Otherwise, user exists WITH a password -> can't register again
  return res.status(400).json({ error: "User already exists" });
}
