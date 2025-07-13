import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { CreateProjectReminderForm } from './create-project-reminder-form';

export interface CreateProjectReminderDialogProps {
  projectId: string;
}

export function CreateProjectReminderDialog({ projectId }: CreateProjectReminderDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-2 w-full border-dashed" variant={'outline'}>
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
        <CreateProjectReminderForm projectId={projectId} />
      </DialogContent>
    </Dialog>
  );
}
