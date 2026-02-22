'use client';

import { taskApiHooks, TaskForm, TaskPayload } from '@/entities/task';
import { Button } from '@/shared/ui/button';
import { ResponsiveModal } from '@/shared/ui/responsive-modal';
import { useState } from 'react';
import { toast } from 'sonner';

export interface CreateTaskDialogProps {
  defaultProject?: string | null;
}

export function CreateTaskDialog({ defaultProject }: CreateTaskDialogProps) {
  const [open, setOpen] = useState(false);

  const create = taskApiHooks.useCreate({
    onSuccess: () => {
      setOpen(false);
      toast.success('Задача успешно добавлена');
    },
    onError: (err) => {
      console.log(err);
      toast.error('Что-то пошло не так при создании задачи');
    },
  });

  const onSubmit = (data: TaskPayload) => {
    create.mutate(data);
  };

  return (
    <ResponsiveModal
      open={open}
      onOpenChange={setOpen}
      title="Добавить задачу"
      trigger={<Button>Добавить задачу</Button>}
    >
      <TaskForm
        onSubmit={onSubmit}
        defaultProject={defaultProject}
        trigger={
          <Button className="w-full" disabled={create.isPending}>
            Создать
          </Button>
        }
      />
    </ResponsiveModal>
  );
}
