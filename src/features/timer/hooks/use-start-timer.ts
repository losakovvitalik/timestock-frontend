import {
  timeEntryCreate,
  TimeEntryCreatePayload,
} from '@/entities/time-entry/api/time-entry-create';
import { useActiveTimeEntryKey } from '@/entities/time-entry/hooks/use-active-time-entry';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useStartTimer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars?: Omit<TimeEntryCreatePayload, 'start_time' | 'end_time'> ) => {
      return timeEntryCreate({
        ...vars,
        start_time: new Date(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: useActiveTimeEntryKey,
      });
    },
    onError: () => {
      toast.error('Не удалось запустить таймер. Попробуйте ещё раз');
    },
  });
}
