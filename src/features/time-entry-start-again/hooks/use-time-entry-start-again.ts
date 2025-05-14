import { timeEntryApiHooks } from '@/entities/time-entry/api/time-entry-api-hooks';
import { useActiveTimeEntry } from '@/entities/time-entry/hooks/use-active-time-entry';
import { TimeEntryDTO } from '@/entities/time-entry/model/types';
import { useMutation } from '@tanstack/react-query';

interface UseTimeEntryStartAgainProps {
  entry: TimeEntryDTO;
}

export function useTimeEntryStartAgain({ entry }: UseTimeEntryStartAgainProps) {
  const { data: activeTimeEntry } = useActiveTimeEntry();

  const updateEntry = timeEntryApiHooks.useUpdate();
  const createEntry = timeEntryApiHooks.useCreate();

  return useMutation({
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
  });
}
