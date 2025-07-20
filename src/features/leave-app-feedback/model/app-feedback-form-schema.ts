import { z } from 'zod';

export const appFeedbackFormSchema = z
  .object({
    rating: z.number().optional(),
    text: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.rating && !data.text) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Нужно указать хотя бы одно',
        path: ['rating'],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Или хотя бы комментарий',
        path: ['comment'],
      });
    }
  });

export type AppFeedbackFormSchemaType = z.infer<typeof appFeedbackFormSchema>;
