"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { z } from "zod";

const updateProfileSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100),
});

export async function updateProfile(data: z.infer<typeof updateProfileSchema>) {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("Não autorizado");
  }

  const parsed = updateProfileSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.errors[0].message);
  }

  await db.user.update({
    where: { email: session.user.email },
    data: { name: parsed.data.name },
  });

  return { success: true };
}
