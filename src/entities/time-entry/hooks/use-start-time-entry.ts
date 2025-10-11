import { ProjectDTO } from '@/entities/project/models/types';
import { activeTimeEntryKey } from '@/entities/time-entry/hooks/use-active-time-entry';
import { TimeEntryDTO, TimeEntryPayload } from '@/entities/time-entry/model/types';
import { ApiCollectionResponse } from '@/shared/types/api';
import { useQueryClient } from '@tanstack/react-query';
import { timeEntryApiHooks } from '../api/time-entry-api-hooks';

/**
 * Входные переменные для запуска таймера.
 *
 * Основаны на {@link TimeEntryPayload}, но:
 * - `end_time` исключён (таймер только стартует),
 * - `project` заменён на объект {@link ProjectDTO} (внутри хука мапится в `project.documentId`).
 */
type Vars = Omit<TimeEntryPayload, 'end_time' | 'project'> & {
  project?: ProjectDTO;
};

export interface UseStartTimeEntryOptions {
  onSuccess?: () => void;
  onError?: () => void;
}

export function useStartTimeEntry(opts?: UseStartTimeEntryOptions) {
  const queryClient = useQueryClient();

  const timeEntryCreate = timeEntryApiHooks.useCreate({
    onMutate: async (vars) => {
      await queryClient.cancelQueries({
        queryKey: activeTimeEntryKey,
      });
      const optimisticTimeEntry: TimeEntryDTO = {
        createdAt: new Date().toISOString(),
        description: vars.description || null,
        documentId: String(new Date().getTime()),
        end_time: null,
        id: new Date().getTime(),
        start_time: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      queryClient.setQueryData(
        activeTimeEntryKey,
        (prevData: ApiCollectionResponse<TimeEntryDTO>) => ({
          ...(prevData ?? { data: [] }),
          data: [optimisticTimeEntry],
        }),
      );
    },
    onError: opts?.onError,
    onSuccess: opts?.onSuccess,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: activeTimeEntryKey });
    },
  });

  const mutate = (vars?: Vars) =>
    timeEntryCreate.mutate({
      ...vars,
      project: vars?.project?.documentId,
      start_time: new Date(),
    });

  const mutateAsync = (vars?: Vars) =>
    timeEntryCreate.mutateAsync({
      ...vars,
      project: vars?.project?.documentId,
      start_time: new Date(),
    });

  return {
    ...timeEntryCreate,
    mutate,
    mutateAsync,
  };
}
