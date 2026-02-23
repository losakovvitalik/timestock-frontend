import { taskApiHooks } from '@/entities/task/api/task-api-hooks';
import { toast } from 'sonner';

export function useTaskImportance({ taskId }: { taskId: string }) {
  const { mutate: updateTask, ...rest } = taskApiHooks.useUpdate();

  const toggleImportance = (isImportant: boolean) => {
    updateTask(
      {
        id: taskId,
        data: { is_important: !isImportant },
      },
      {
        onSuccess: () => {
          toast(!isImportant ? 'Задача закреплена' : 'Задача откреплена');
        },
        onError: () => {
          toast.error('Не удалось обновить задачу');
        },
      },
    );
  };

  return {
    toggleImportance,
    ...rest,
  };
}
