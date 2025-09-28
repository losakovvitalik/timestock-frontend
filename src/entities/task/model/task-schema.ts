import { z } from 'zod';

export const taskSchema = z.object({
  name: z
    .string({ required_error: 'Пожалуйста, укажите название' })
    .nonempty('Пожалуйста, укажите название'),
  estimatedTime: z.string().optional(),
  description: z.string().optional(),
  project: z.string().nullable().optional(),
});

export type TaskSchemaType = z.infer<typeof taskSchema>;
