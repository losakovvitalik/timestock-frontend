import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { timerFormSchema, TimerFormSchemaType } from '../model/timer-form-schema';

export function useTimerForm() {
  return useForm<TimerFormSchemaType>({
    resolver: zodResolver(timerFormSchema),
  });
}
