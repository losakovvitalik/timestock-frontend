import { z } from 'zod';

export const authOTPFormSchema = z.object({
  email: z.string().email(),
  code: z.string({ required_error: 'Пожалуйста, укажите код' }),
});

export type AuthOTPFormSchemaType = z.infer<typeof authOTPFormSchema>;
