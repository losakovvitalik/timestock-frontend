import { z } from 'zod';

export const projectReminderFormSchema = z.object({
  text: z.string().optional(),
  enabled: z.boolean().optional(),
  recurrence_options: z.object({
    interval: z.enum(['DAILY']),
    time: z.string(),
    daysOfWeek: z.array(z.number()).default([1, 2, 3, 4, 5, 6, 7]),
  }),
  repeatable: z.boolean().default(false),
});

export type ProjectReminderFormSchemaType = z.infer<typeof projectReminderFormSchema>;
