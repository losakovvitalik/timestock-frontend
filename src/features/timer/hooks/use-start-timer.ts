import { timeEntryApiHooks } from '@/entities/time-entry/api/time-entry-api-hooks';
import { TimeEntryPayload } from '@/entities/time-entry/model/types';
import toast from 'react-hot-toast';

type Vars = Omit<TimeEntryPayload, 'start_time' | 'end_time'>;

export function useStartTimer() {
  const timeEntryCreate = timeEntryApiHooks.useCreate({
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
