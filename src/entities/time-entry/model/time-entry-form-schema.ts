import { z } from 'zod';

export const timeEntryFormSchema = z.object({
  description: z.string().optional(),
  project: z.string().nullable().optional(),
  duration: z.string(),
});

export type TimeEntryFormSchemaType = z.infer<typeof timeEntryFormSchema>;
