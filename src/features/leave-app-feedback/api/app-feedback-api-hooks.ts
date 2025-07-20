import { createApiHooks } from '@/shared/lib/react-query/create-api-hooks';
import { AppFeedbackFormSchemaType } from '../model/app-feedback-form-schema';

export const appFeedbackApiHooks = createApiHooks<any, AppFeedbackFormSchemaType>(
  'app-feedback',
  '/app-feedbacks',
);
