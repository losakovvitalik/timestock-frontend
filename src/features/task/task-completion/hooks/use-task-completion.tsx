import { taskApiHooks } from '@/entities/task/api/task-api-hooks';
import { Check, Undo2 } from 'lucide-react';
import { toast } from 'sonner';

export function useTaskCompletion({ taskId }: { taskId: string }) {
  const { mutate: updateTask, ...rest } = taskApiHooks.useUpdate();

  const completeTask = () => {
    updateTask(
      {
        id: taskId,
        data: { is_completed: true },
      },
      {
        onSuccess: () => {
          toast(
            <div className="flex items-center gap-2">
              <Check className="size-4" /> Задача выполнена
            </div>,
            {
              action: {
                label: 'Отменить',
                onClick: () => reopenTask(),
              },
            },
          );
        },
      },
    );
  };

  const reopenTask = () => {
    updateTask(
      {
        id: taskId,
        data: { is_completed: false },
      },
      {
        onSuccess: () => {
          toast(
            <div className="flex items-center gap-2">
              <Undo2 className="size-4" /> Задача возвращена в работу
            </div>,
            {
              action: {
                label: 'Отменить',
                onClick: () => completeTask(),
              },
            },
          );
        },
      },
    );
  };

  return {
    completeTask,
    reopenTask,
    ...rest,
  };
}
