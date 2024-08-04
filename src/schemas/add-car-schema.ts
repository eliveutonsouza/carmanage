import { z } from "zod";

// Schema for the form to add a new car
export const addCarSchema = z.object({
  plate: z.string().min(7).max(7),
  surname: z.string().min(1).max(100),
});

export type AddCarFormData = z.infer<typeof addCarSchema>;
