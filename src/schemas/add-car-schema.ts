import { z } from "zod";

const plateValidation = new RegExp(/^[a-zA-Z]{3}[0-9][A-Za-z0-9][0-9]{2}$/);

// Schema for the form to add a new car
export const addCarSchema = z.object({
  plate: z
    .string()
    .min(7, { message: "Placa inválida!" })
    .max(8, { message: "Placa invalida!" })
    .regex(plateValidation, {
      message: "Essa não é uma placa valida!",
    }),
  surname: z
    .string()
    .min(1, {
      message: "Descreva a manutenção do seu veiculo",
    })
    .max(100),
});

export type AddCarFormData = z.infer<typeof addCarSchema>;
