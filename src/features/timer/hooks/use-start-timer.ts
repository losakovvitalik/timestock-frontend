import { ProjectDTO } from '@/entities/project/models/types';
import { TimeEntryDTO, TimeEntryPayload } from '@/entities/time-entry/model/types';
import { entities } from '@/shared/api/entities';
import { createApiHooks } from '@/shared/lib/react-query/create-api-hooks';
import toast from 'react-hot-toast';

type Vars = Omit<TimeEntryPayload, 'start_time' | 'end_time'> & {
  project?: ProjectDTO;
};

export function useStartTimer() {
  const activeTimeEntry = createApiHooks<TimeEntryDTO, TimeEntryPayload>(
    entities.timeEntry.key,
    entities.timeEntry.path,
  );

  const timeEntryCreate = activeTimeEntry.useCreate({
    onError: () => {
      toast.error('Не удалось запустить таймер. Попробуйте ещё раз');
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
