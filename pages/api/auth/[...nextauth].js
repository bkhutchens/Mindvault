// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) {
          throw new Error("No user found with that email");
        }
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }
        return user;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
  // **Add this block to override default NextAuth pages**:
  pages: {
    signIn: "/login",    // use your custom login page
    newUser: "/register" // optional: if you want new users to be redirected
  },

  async authorize(credentials) {
  const user = await prisma.user.findUnique({
    where: { email: credentials.email },
  });
  console.log("User from DB:", user); // TEMP for debugging

  if (!user) {
    throw new Error("No user found with that email");
  }
  if (!user.password) {
    throw new Error("Account has no password. Try logging in with Google or set a password.");
  }
  
    const isValid = await bcrypt.compare(credentials.password, user.password);
    if (!isValid) {
      throw new Error("Invalid password");
    }
    return user;
  }
  
});
