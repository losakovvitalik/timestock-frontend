import { timeEntryApiHooks } from '@/entities/time-entry/api/time-entry-api-hooks';
import {
  activeTimeEntryKey,
  useActiveTimeEntry,
} from '@/entities/time-entry/hooks/use-active-time-entry';
import { TimeEntryDTO } from '@/entities/time-entry/model/types';
import { ApiCollectionResponse } from '@/shared/types/api';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useStopTimer() {
  const queryClient = useQueryClient();

  const activeTimeEntry = useActiveTimeEntry();
  const timeEntryUpdate = timeEntryApiHooks.useUpdate({
    onMutate: () => {
      queryClient.setQueryData(
        activeTimeEntryKey,
        (prevData: ApiCollectionResponse<TimeEntryDTO>) => ({
          ...prevData,
          data: [],
        }),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: activeTimeEntryKey,
      });
    },
    onError: () => {
      toast.error('Не удалось остановить таймер. Что-то пошло не так.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: activeTimeEntryKey });
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
