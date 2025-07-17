import { z } from 'zod';

export const updateUserProfileFormSchema = z.object({
  timezone: z.string(),
});

export type UpdateUserProfileFormSchemaType = z.infer<typeof updateUserProfileFormSchema>;
