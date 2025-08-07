import { ProjectDTO } from '@/entities/project/models/types';
import { activeTimeEntryKey } from '@/entities/time-entry/hooks/use-active-time-entry';
import { TimeEntryDTO, TimeEntryPayload } from '@/entities/time-entry/model/types';
import { entities } from '@/shared/api/entities';
import { createApiHooks } from '@/shared/lib/react-query/create-api-hooks';
import { ApiCollectionResponse } from '@/shared/types/api';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

type Vars = Omit<TimeEntryPayload, 'start_time' | 'end_time'> & {
  project?: ProjectDTO;
};

export function useStartTimer() {
  const queryClient = useQueryClient();

  const activeTimeEntry = createApiHooks<TimeEntryDTO, TimeEntryPayload>(
    entities.timeEntry.key,
    entities.timeEntry.path,
  );

  const timeEntryCreate = activeTimeEntry.useCreate({
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
          ...prevData,
          data: [optimisticTimeEntry],
        }),
      );
    },
    onError: () => {
      toast.error('Не удалось запустить таймер. Попробуйте ещё раз');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: activeTimeEntryKey });
    },
  });

  const mutate = (vars?: Vars) =>
    timeEntryCreate.mutate({
      ...vars,
      start_time: new Date(),
    });

  const mutateAsync = (vars?: Vars) =>
    timeEntryCreate.mutateAsync({
      ...vars,
      start_time: new Date(),
    });

  return {
    ...timeEntryCreate,
    mutate,
    mutateAsync,
  };
}
