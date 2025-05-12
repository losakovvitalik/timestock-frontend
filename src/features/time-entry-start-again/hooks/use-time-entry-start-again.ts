import { timeEntryApiHooks } from '@/entities/time-entry/api/time-entry-api-hooks';
import { useActiveTimeEntry } from '@/entities/time-entry/hooks/use-active-time-entry';
import { TimeEntryDTO } from '@/entities/time-entry/model/types';
import { useMutation } from '@tanstack/react-query';
import { timeEntryApi } from '../../../entities/time-entry/api/time-entry-api';

interface UseTimeEntryStartAgainProps {
  entry: TimeEntryDTO;
}

export function useTimeEntryStartAgain({ entry }: UseTimeEntryStartAgainProps) {
  const { data: activeTimeEntry } = useActiveTimeEntry();
  const endActive = timeEntryApiHooks.useUpdate();

  return useMutation({
    mutationFn: async () => {
      if (activeTimeEntry) {
        await endActive.mutateAsync({
          id: activeTimeEntry.documentId,
          data: {
            end_time: new Date(),
          },
        });
      }

      await timeEntryApi.create({
        description: entry.description || undefined,
        start_time: new Date(),
        project: entry.project?.documentId,
      });
    },
  });
}
