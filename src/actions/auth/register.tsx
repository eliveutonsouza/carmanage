"use server";
import db from "@/lib/db";
import { hashPassword } from "@/lib/utils";
import { registerFormSchemaType } from "@/schemas/register-form-schema";

export default async function CreateNewUser(formData: registerFormSchemaType) {
  try {
    const { name, email, password } = formData;

    // Verifique se algum campo está vazio
    if (!name || !email || !password) {
      throw new Error("Preencha todos os campos");
    }

    // Verifique se o usuário já existe
    const userExists = await db.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new Error("Usuário já existe");
    }

    await db.user.create({
      data: {
        name,
        email,
        passwordHash: await hashPassword(password),
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Ocorreu um erro desconhecido.", error);
    }
  }
}
