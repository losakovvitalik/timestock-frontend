'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { timeEntryFormSchema, TimeEntryFormSchemaType } from '../model/time-entry-form-schema';

export interface UseTimeEntryFormProps {
  defaultValues?: Partial<TimeEntryFormSchemaType>;
}

export function useTimeEntryForm(props?: UseTimeEntryFormProps) {
  return useForm<TimeEntryFormSchemaType>({
    resolver: zodResolver(timeEntryFormSchema),
    reValidateMode: 'onChange',
    ...props,
  });
}
