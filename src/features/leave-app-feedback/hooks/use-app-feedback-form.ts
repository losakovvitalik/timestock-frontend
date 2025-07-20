import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  appFeedbackFormSchema,
  AppFeedbackFormSchemaType,
} from '../model/app-feedback-form-schema';

export const useAppFeedbackForm = () => {
  return useForm<AppFeedbackFormSchemaType>({
    resolver: zodResolver(appFeedbackFormSchema),
  });
};
