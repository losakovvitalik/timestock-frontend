'use client';

import { taskApiHooks } from '@/entities/task/api/task-api-hooks';
import { TaskPayload } from '@/entities/task/model/task-types';
import { TaskForm } from '@/entities/task/ui/task-form';
import { Button } from '@/shared/ui/button';
import { ResponsiveModal } from '@/shared/ui/responsive-modal';
import { toast } from 'sonner';

export function CreateTaskDialog() {
  const create = taskApiHooks.useCreate({
    onSuccess: () => toast.success('Задача успешно добавлена'),
    onError: (err) => {
      console.log(err);
      toast.error('Что-то пошло не так при создании задачи');
    },
  });

  const onSubmit = (data: TaskPayload) => {
    create.mutate(data);
  };

  return (
    <ResponsiveModal title="Добавить задачу" trigger={<Button>Добавить задачу</Button>}>
      <TaskForm
        onSubmit={onSubmit}
        trigger={
          <Button className="w-full" disabled={create.isPending}>
            Создать
          </Button>
        }
      />
    </ResponsiveModal>
  );
}
