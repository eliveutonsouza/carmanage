import { z } from "zod";

export const reportSchema = z.object({
  nameReport: z.string(),
});

export const formSettingReportSchema = z.object({
  active: z.boolean().default(true),
});

export type formSettingReportSchemaData = z.infer<
  typeof formSettingReportSchema
>;
