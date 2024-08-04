import { z } from "zod";

export const registerFormSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: "E-mail inválido!" }),
  password: z.string().min(5, { message: "Senha inválida!" }),
});

export type registerFormSchemaType = z.infer<typeof registerFormSchema>;
