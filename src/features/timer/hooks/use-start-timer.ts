import { timeEntryApi } from '@/entities/time-entry/api/time-entry-api';
import { useActiveTimeEntryKey } from '@/entities/time-entry/hooks/use-active-time-entry';
import { TimeEntryPayload } from '@/entities/time-entry/model/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useStartTimer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars?: Pick<TimeEntryPayload, 'description' | 'project'>) => {
      return timeEntryApi.create({
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
