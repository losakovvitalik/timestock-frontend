import { z } from 'zod';

export const authFormSchema = z.object({
  email: z.string().email('Укажите email'),
});

export type AuthFormSchemaType = z.infer<typeof authFormSchema>;
