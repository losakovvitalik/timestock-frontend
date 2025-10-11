import { timeEntryApiHooks } from '@/entities/time-entry/api/time-entry-api-hooks';
import {
  activeTimeEntryKey,
  useActiveTimeEntry,
} from '@/entities/time-entry/hooks/use-active-time-entry';
import { TimeEntry, TimeEntryDTO } from '@/entities/time-entry/model/types';
import { entities } from '@/shared/api/entities';
import { ApiCollectionResponse } from '@/shared/types/api';
import { getDuration } from '@/shared/utils/duration';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';

export interface UseStopTimeEntryOptions {
  onError?: () => void;
  onSuccess?: () => void;
}

export function useStopTimeEntry(options?: UseStopTimeEntryOptions) {
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
          ...(prevData ?? { data: [] }),
          data: [],
        }),
      );

      queryClient.setQueryData(
        timeEntryApiHooks.keys.lists(),
        (prevData: InfiniteData<ApiCollectionResponse<TimeEntryDTO>>) => {
          if (!prevData) return prevData;

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

      queryClient.invalidateQueries({
        queryKey: [entities.task.key],
      });

      options?.onSuccess?.();
    },
    onError: (err) => {
      console.log(err);
      options?.onError?.();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: activeTimeEntryKey });
    },
  });

  const mutate = () => {
    if (!activeTimeEntry.data) {
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
