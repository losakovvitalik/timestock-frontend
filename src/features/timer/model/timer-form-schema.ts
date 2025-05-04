import { z } from 'zod';

export const timerFormSchema = z.object({
  name: z.string().optional(),
  project: z.number().optional(),
});

export type TimerFormSchemaType = z.infer<typeof timerFormSchema>;
