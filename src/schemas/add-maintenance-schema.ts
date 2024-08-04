import { z } from "zod";

export const addMaintenanceSchema = z.object({
  nameMaintenance: z.string(),
  lastDateMaintenance: z.date(),
  nextDateMaintenance: z.date(),
});

export type AddMaintenanceFormData = z.infer<typeof addMaintenanceSchema>;
