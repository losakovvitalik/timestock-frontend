import { timeEntryUpdate } from '@/entities/time-entry/api/time-entry-update';
import {
  useActiveTimeEntry,
  useActiveTimeEntryKey,
} from '@/entities/time-entry/hooks/use-active-time-entry';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useStopTimer() {
  const activeTimeEntry = useActiveTimeEntry();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      if (!activeTimeEntry.data) {
        throw new Error('Сначала запустите таймер');
      }

      return timeEntryUpdate(activeTimeEntry.data.documentId, {
        end_time: new Date(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: useActiveTimeEntryKey,
      });
    },
    onError: () => {
      toast.error('Не удалось остановить таймер. Что-то пошло не так.');
    },
  });
}
