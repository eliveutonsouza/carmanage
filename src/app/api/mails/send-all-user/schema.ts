import { z } from "zod";

export const CarMaintenanceSchema = z.object({
  id: z.string(),
  name: z.string(),
  lastMaintenance: z.date(),
  nextMaintenance: z.date(),
  status: z.enum(["VENCIDA", "CONFORME"]),
  carId: z.string(),
});

export const CarManageMailSchema = z.object({
  id: z.string(),
  name: z.string(),
  plate: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  CarMaintenance: z.array(CarMaintenanceSchema),
});

export const UserSchema = z.object({
  email: z.string(),
  image: z.string().nullable(),
  name: z.string().nullable(),
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  emailVerified: z.date().nullable(),
});
