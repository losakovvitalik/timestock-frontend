'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { timerFormSchema, TimerFormSchemaType } from '../model/timer-form-schema';

export interface UseTimerInfoFormProps {
  defaultValues?: Partial<TimerFormSchemaType>;
}

export function useTimerInfoForm(props?: UseTimerInfoFormProps) {
  return useForm<TimerFormSchemaType>({
    resolver: zodResolver(timerFormSchema),
    ...props,
  });
}
