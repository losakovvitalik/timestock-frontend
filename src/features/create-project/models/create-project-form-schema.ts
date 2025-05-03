import { z } from 'zod';

export const createProjectFormSchema = z.object({
  name: z
    .string({
      required_error: 'Название проекта не может быть пустым',
    })
    .min(3, 'Название проекта не может быть короче 3 символов')
    .max(50, 'Название проекта не может быть больше 50 символов'),
  description: z.string().max(500, 'Описание проекта не может быть больше 500 символов').optional(),
});

export type CreateProjectFormSchemaType = z.infer<typeof createProjectFormSchema>;
