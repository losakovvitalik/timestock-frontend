'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { timeEntryFormSchema, TimeEntryFormSchemaType } from '../model/time-entry-form-schema';

export interface UseTimeEntryInfoFormProps {
  defaultValues?: Partial<TimeEntryFormSchemaType>;
}

export function useTimeEntryInfoForm(props?: UseTimeEntryInfoFormProps) {
  return useForm<TimeEntryFormSchemaType>({
    resolver: zodResolver(timeEntryFormSchema),
    ...props,
  });
}
