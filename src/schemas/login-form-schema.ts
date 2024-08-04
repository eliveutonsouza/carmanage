import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email({ message: "E-mail inválido!" }),
  password: z.string().min(5, { message: "Senha inválida!" }),
});

export type loginFormSchemaType = z.infer<typeof loginFormSchema>;
