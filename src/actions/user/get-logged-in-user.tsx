"use server";

import { auth } from "@/auth";
import db from "@/lib/db";

export default async function getLoggedInUser() {
  const session = await auth();

  try {
    if (!session) {
      throw new Error("Session not found");
    }
    if (!session.user) {
      throw new Error("User not found in session");
    }
    const userEmail = session.user.email ?? "";
    const user = await db.user.findUnique({
      where: { email: userEmail },
    });

    if (user) {
      const { email, image, name, id, createdAt, updatedAt, emailVerified } =
        user;

      return { email, image, name, id, createdAt, updatedAt, emailVerified };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching user:", error.message);
      throw new Error("Error fetching user", error);
    }
  }
}
