import { z } from "zod";

export const EditExistingCarFormSchema = z.object({
  nameMaintenance: z.string(),
  lastDateMaintenance: z.date(),
  nextDateMaintenance: z.date(),
  id: z.string().optional(),
});

export type EditExistingMaintenanceFormData = z.infer<
  typeof EditExistingCarFormSchema
>;
