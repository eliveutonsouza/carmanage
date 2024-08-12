import { z } from "zod";
export const EditExistingCarFormSchema = z.object({
  plate: z.string().min(7).max(7),
  surname: z.string().min(1).max(100),
  id: z.string().optional(),
});

export type EditExistingCarFormData = z.infer<typeof EditExistingCarFormSchema>;
