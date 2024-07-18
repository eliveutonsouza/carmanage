import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import db from "./lib/db";
import { comparePassword } from "./lib/utils";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@exemplo.com.br",
        },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials.email as string;
        const password = credentials.password as string;

        if (!email || !password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: { email },
        });

        if (!user) {
          return null;
        }

        const passwordMatch = await comparePassword(
          password,
          user.passwordHash ?? ""
        );
        if (!passwordMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
});