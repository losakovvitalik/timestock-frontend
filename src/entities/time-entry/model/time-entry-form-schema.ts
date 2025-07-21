import { z } from 'zod';

export const timeEntryFormSchema = z
  .object({
    description: z.string().optional(),
    project: z.string().nullable().optional(),
    duration: z.string(),
    date: z.string(),
    startTime: z.date(),
    endTime: z.date().optional(),
  })
  .refine((data) => data.endTime && data.endTime > data.startTime, {
    message: 'Время конца не может быть меньше времени начала',
    path: ['endTime'], // path of error
  });

export type TimeEntryFormSchemaType = z.infer<typeof timeEntryFormSchema>;
