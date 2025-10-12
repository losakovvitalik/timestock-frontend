import { z } from 'zod';

const envSchema = z.object({
  BACKEND_URL: z.string(),
});

export const env = envSchema.parse({
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
});
