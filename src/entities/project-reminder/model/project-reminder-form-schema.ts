import { z } from 'zod';

export const projectReminderFormSchema = z.object({
  text: z.string().optional(),
  enabled: z.boolean().optional(),
  recurrence_options: z.object({
    interval: z.enum(['DAILY']),
    time: z.string(),
  }),
});

export type ProjectReminderFormSchemaType = z.infer<typeof projectReminderFormSchema>;
