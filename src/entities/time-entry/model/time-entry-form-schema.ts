import { z } from 'zod';

export const timeEntryFormSchema = z.object({
  description: z.string().optional(),
  project: z.string().optional(),
});

export type TimeEntryFormSchemaType = z.infer<typeof timeEntryFormSchema>;
