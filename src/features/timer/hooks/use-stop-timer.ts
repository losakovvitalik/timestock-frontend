import { timeEntryApiHooks } from '@/entities/time-entry/api/time-entry-api-hooks';
import {
  useActiveTimeEntry,
  useActiveTimeEntryKey,
} from '@/entities/time-entry/hooks/use-active-time-entry';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useStopTimer() {
  const queryClient = useQueryClient();

  const activeTimeEntry = useActiveTimeEntry();
  const timeEntryUpdate = timeEntryApiHooks.useUpdate({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: useActiveTimeEntryKey,
      });
    },
    onError: () => {
      toast.error('Не удалось остановить таймер. Что-то пошло не так.');
    },
  });

  const mutate = () => {
    if (!activeTimeEntry.data) {
      toast.error('Нет активного таймера. Сначала запустите таймер.');
      return;
    }

    return timeEntryUpdate.mutate({
      id: activeTimeEntry.data.documentId,
      data: {
        end_time: new Date(),
      },
    });
  };

  const mutateAsync = () => {
    if (!activeTimeEntry.data) {
      toast.error('Нет активного таймера. Сначала запустите таймер.');
      return Promise.resolve();
    }

    return timeEntryUpdate.mutateAsync({
      id: activeTimeEntry.data.documentId,
      data: {
        end_time: new Date(),
      },
    });
  };

  return {
    ...timeEntryUpdate,
    mutate,
    mutateAsync,
  };
}
