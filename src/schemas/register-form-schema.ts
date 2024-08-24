import { z } from "zod";

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

export const registerFormSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: "E-mail inválido!" }),
  password: z
    .string()
    .min(1, { message: "Deve ter pelo menos 1 caractere" })
    .regex(passwordValidation, {
      message: "Sua senha não é válida",
    }),
});

export type registerFormSchemaType = z.infer<typeof registerFormSchema>;
