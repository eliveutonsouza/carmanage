import { z } from "zod";

// Schema for the form to add a new car
export const addCarSchema = z.object({
  plate: z.string().min(7).max(7),
  surname: z.string().min(1).max(100),
  maintenance: z.array(
    z.object({
      nameMaintenance: z.string().min(1).max(100),
      lastDateMaintenance: z.date(),
      nextDateMaintenance: z.date(),
    })
  ),
});

export type AddCarFormData = z.infer<typeof addCarSchema>;
