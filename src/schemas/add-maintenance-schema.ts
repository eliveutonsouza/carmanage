import { z } from "zod";

export const addMaintenanceSchema = z.object({
  nameMaintenance: z.string().min(1, "Nome obrigatório"),
  type: z.enum(["PREVENTIVA", "CORRETIVA"]).default("PREVENTIVA"),
  lastDateMaintenance: z.date(),
  nextDateMaintenance: z.date(),
  cost: z.string().optional(),
  provider: z.string().optional(),
  notes: z.string().optional(),
});

export type AddMaintenanceFormData = z.infer<typeof addMaintenanceSchema>;
