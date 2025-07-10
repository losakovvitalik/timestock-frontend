'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { projectReminderFormSchema } from '../model/project-reminder-form-schema';
import { ProjectReminder } from '../model/types';

export interface UseProjectFormProps {
  defaultValues?: Partial<ProjectReminder>;
}

export function useProjectReminderForm({ defaultValues }: UseProjectFormProps) {
  return useForm({
    resolver: zodResolver(projectReminderFormSchema),
    defaultValues: {
      ...defaultValues,
    },
  });
}
