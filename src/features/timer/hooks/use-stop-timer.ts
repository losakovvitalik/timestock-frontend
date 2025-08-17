import { timeEntryApiHooks } from '@/entities/time-entry/api/time-entry-api-hooks';
import {
  activeTimeEntryKey,
  useActiveTimeEntry,
} from '@/entities/time-entry/hooks/use-active-time-entry';
import { TimeEntry, TimeEntryDTO } from '@/entities/time-entry/model/types';
import { ApiCollectionResponse } from '@/shared/types/api';
import { getDuration } from '@/shared/utils/duration';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useStopTimer() {
  const queryClient = useQueryClient();

  const activeTimeEntry = useActiveTimeEntry();
  const timeEntryUpdate = timeEntryApiHooks.useUpdate({
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: activeTimeEntryKey,
      });

      await queryClient.cancelQueries({
        queryKey: timeEntryApiHooks.keys.lists(),
      });

      queryClient.setQueryData(
        activeTimeEntryKey,
        (prevData: ApiCollectionResponse<TimeEntry>) => ({
          ...prevData,
          data: [],
        }),
      );

      queryClient.setQueryData(
        timeEntryApiHooks.keys.lists(),
        (prevData: InfiniteData<ApiCollectionResponse<TimeEntryDTO>>) => {
          console.log('prevData', prevData);
          if (!prevData) return prevData;

          console.log({
            ...prevData,
            pages: prevData.pages.map((p, i) =>
              i === 0
                ? {
                    ...p,
                    data: [
                      {
                        ...activeTimeEntry.data,
                        duration: getDuration(activeTimeEntry.data?.start_time || new Date()),
                        end_time: new Date(),
                        isPending: true,
                      },
                      ...p.data,
                    ],
                  }
                : p,
            ),
          });

          return {
            ...prevData,
            pages: prevData.pages.map((p, i) =>
              i === 0
                ? {
                    ...p,
                    data: [
                      {
                        ...activeTimeEntry.data,
                        duration: getDuration(activeTimeEntry.data?.start_time || new Date()),
                        end_time: new Date(),
                        isPending: true,
                      },
                      ...p.data,
                    ],
                  }
                : p,
            ),
          };
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: activeTimeEntryKey,
      });

      queryClient.invalidateQueries({
        queryKey: timeEntryApiHooks.keys.lists(),
        exact: true,
      });
    },
    onError: (err) => {
      console.log(err);
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
