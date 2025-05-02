import { z } from 'zod';

export const authFormSchema = z.object({
  email: z
    .string({
      required_error: 'Обязательно',
    })
    .email('Укажите email в правильном формате'),
});

export type AuthFormSchemaType = z.infer<typeof authFormSchema>;
