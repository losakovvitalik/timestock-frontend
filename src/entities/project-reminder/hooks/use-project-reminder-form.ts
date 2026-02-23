'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { DAYS_OF_WEEK } from '../model/constants';
import { projectReminderFormSchema } from '../model/project-reminder-form-schema';
import { ProjectReminderDTO } from '../model/types';

const ALL_DAYS = DAYS_OF_WEEK.map((d) => d.value);

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
        daysOfWeek: ALL_DAYS as number[],
        ...defaultValues?.recurrence_options,
      },
    },
  });
}
