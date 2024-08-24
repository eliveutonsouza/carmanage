"use server";

import { signIn } from "@/auth";
import { loginFormSchemaType } from "@/schemas/login-form-schema";
import { AuthError } from "next-auth";

export default async function userLogin(loginFormData: loginFormSchemaType) {
  try {
    const { email, password } = loginFormData;

    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
      redirect: true,
    });
  } catch (error) {
    if (error instanceof AuthError && error.type === "CredentialsSignin") {
      return error;
    }

    throw error;
  }
}
