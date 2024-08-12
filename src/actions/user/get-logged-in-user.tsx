"use server";

import { auth } from "@/auth";
import db from "@/lib/db";

export default async function getLoggedInUser() {
  try {
    const session = await auth();

    const user = await db.user.findUnique({
      where: { email: session?.user?.email ?? "" },
    });

    if (user) {
      const { email, image, name, id, createdAt, updatedAt, emailVerified } =
        user;

      return { email, image, name, id, createdAt, updatedAt, emailVerified };
    }

    return null;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching user:", error.message);
      throw new Error("Error fetching user", error);
    }
  }
}
