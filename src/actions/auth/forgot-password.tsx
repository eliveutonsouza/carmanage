"use server";

import db from "@/lib/db";
import { Resend } from "resend";
import { render } from "@react-email/components";
import { EmailResetPassword } from "@/emails/email-reset-password";
import { randomUUID } from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function forgotPassword(email: string) {
  const user = await db.user.findUnique({ where: { email } });

  if (!user) {
    return { success: true };
  }

  await db.passwordResetToken.deleteMany({ where: { email } });

  const token = randomUUID();
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

  await db.passwordResetToken.create({
    data: { email, token, expires },
  });

  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
  const emailHtml = render(
    EmailResetPassword({ userName: user.name ?? "", resetUrl })
  );

  await resend.emails.send({
    from: "Car Manage <no-reply@carmanage.tech>",
    to: [email],
    subject: "Redefinição de senha — Car Manage",
    html: emailHtml,
  });

  return { success: true };
}
