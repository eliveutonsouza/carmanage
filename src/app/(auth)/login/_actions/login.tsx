"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export default async function login(formData: FormData) {
  console.log(formData);

  const entries = Array.from(formData.entries());
  console.log(entries);
  const { email, password } = Object.fromEntries(entries) as {
    email: string;
    password: string;
  };

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
      redirect: false,
    });
  } catch (e) {
    if (e instanceof AuthError) {
      if (e.type === "CredentialsSignin") {
        throw new Error("Credenciais inválidas");
      }
    }
  }

  redirect("/dashboard");
}
