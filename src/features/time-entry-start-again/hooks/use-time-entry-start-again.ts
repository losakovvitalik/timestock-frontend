import { timeEntryApiHooks } from '@/entities/time-entry/api/time-entry-api-hooks';
import {
  activeTimeEntryKey,
  useActiveTimeEntry,
} from '@/entities/time-entry/hooks/use-active-time-entry';
import { TimeEntryDTO } from '@/entities/time-entry/model/types';
import { ApiCollectionResponse } from '@/shared/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UseTimeEntryStartAgainProps {
  entry: TimeEntryDTO;
}

export function useTimeEntryStartAgain({ entry }: UseTimeEntryStartAgainProps) {
  const { data: activeTimeEntry } = useActiveTimeEntry();
  const queryClient = useQueryClient();

  const updateEntry = timeEntryApiHooks.useUpdate();
  const createEntry = timeEntryApiHooks.useCreate();

  return useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: activeTimeEntryKey,
      });

      const optimisticTimeEntry: TimeEntryDTO = {
        createdAt: new Date().toISOString(),
        description: entry.description || null,
        documentId: String(new Date().getTime()),
        end_time: null,
        id: new Date().getTime(),
        start_time: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        project: entry.project,
      };

      queryClient.setQueryData(
        activeTimeEntryKey,
        (prevData: ApiCollectionResponse<TimeEntryDTO>) => ({
          ...prevData,
          data: [optimisticTimeEntry],
        }),
      );
    },
    mutationFn: async () => {
      if (activeTimeEntry) {
        await updateEntry.mutateAsync({
          id: activeTimeEntry.documentId,
          data: {
            end_time: new Date(),
          },
        });
      }

      await createEntry.mutateAsync({
        description: entry.description || undefined,
        start_time: new Date(),
        project: entry.project?.documentId,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: activeTimeEntryKey });
    },
  });
}
