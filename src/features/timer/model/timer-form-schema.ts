import { z } from 'zod';

export const timerFormSchema = z.object({
  description: z.string().optional(),
  project: z.string().optional(),
});

export type TimerFormSchemaType = z.infer<typeof timerFormSchema>;
