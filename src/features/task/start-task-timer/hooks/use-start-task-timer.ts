import { TaskDTO } from '@/entities/task/model/task-types';
import { useStartTimeEntry } from '@/entities/time-entry/hooks/use-start-time-entry';
import { toast } from 'sonner';

export interface UseStartTaskTimerOptions {
  task: TaskDTO;
}

export function useStartTaskTimer({ task }: UseStartTaskTimerOptions) {
  const { mutate, isPending } = useStartTimeEntry({
    onSuccess: () => toast.success('Таймер запущен'),
    onError: () => toast.error('Не удалось запустить таймер'),
  });

  const start = () => {
    return mutate({
      description: task.name,
      project: task.project,
      task: task.documentId,
    });
  };

  return {
    isStartPending: isPending,
    start,
  };
}
