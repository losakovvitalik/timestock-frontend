'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { projectReminderFormSchema } from '../model/project-reminder-form-schema';
import { ProjectReminderDTO } from '../model/types';

export interface UseProjectFormProps {
  defaultValues?: Partial<ProjectReminderDTO>;
}

export function useProjectReminderForm({ defaultValues }: UseProjectFormProps) {
  return useForm({
    resolver: zodResolver(projectReminderFormSchema),
    defaultValues: {
      ...defaultValues,
      recurrence_options: {
        interval: 'DAILY' as const,
        ...defaultValues?.recurrence_options,
      },
    },
  });
}
