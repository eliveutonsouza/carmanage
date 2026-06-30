"use server";

import db from "@/lib/db";
import { hash } from "bcrypt-ts";

export async function resetPassword(token: string, newPassword: string) {
  const resetToken = await db.passwordResetToken.findUnique({ where: { token } });

  if (!resetToken || resetToken.expires < new Date()) {
    return { success: false as const, error: "Link expirado ou inválido. Solicite um novo." };
  }

  const passwordHash = await hash(newPassword, 5);

  await db.user.update({
    where: { email: resetToken.email },
    data: { passwordHash },
  });

  await db.passwordResetToken.delete({ where: { token } });

  return { success: true as const };
}
