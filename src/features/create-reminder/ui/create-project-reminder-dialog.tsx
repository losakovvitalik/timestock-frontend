'use client';

import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { useState } from 'react';
import { CreateProjectReminderForm } from './create-project-reminder-form';

export interface CreateProjectReminderDialogProps {
  projectId: string;
}

export function CreateProjectReminderDialog({ projectId }: CreateProjectReminderDialogProps) {
  const [open, setOpen] = useState(false);

  const handleOnSuccess = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full border-dashed" variant="outline">
          Добавить напоминание
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Новое напоминание</DialogTitle>
          <DialogDescription>
            Это напоминание будет приходить Вам в пуш-уведомлении
          </DialogDescription>
        </DialogHeader>
        <CreateProjectReminderForm onSuccess={handleOnSuccess} projectId={projectId} />
      </DialogContent>
    </Dialog>
  );
}
