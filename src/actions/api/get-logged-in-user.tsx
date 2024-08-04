"use server";

import { auth } from "@/auth";
import db from "@/lib/db";

export default async function getLoggedInUser() {
  const session = await auth();

  const user = await db.user.findUnique({
    where: { email: session?.user?.email ?? "" },
  });

  try {
    if (user) {
      const { email, image, name, id, createdAt, updatedAt, emailVerified } =
        user;

      return { email, image, name, id, createdAt, updatedAt, emailVerified };
    }

    return null;
  } catch (error) {
    console.log("Error fetching user:", error);
    throw new Error("Error fetching user");
  }
}
