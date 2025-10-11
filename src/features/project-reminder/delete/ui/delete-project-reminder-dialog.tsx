import { projectReminderApiHooks } from '@/entities/project-reminder/api/project-reminder-api-hooks';
import { ProjectReminderDTO } from '@/entities/project-reminder/model/types';
import { Button, buttonVariants } from '@/shared/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { toast } from 'sonner';

export interface DeleteProjectReminderDialogProps {
  projectReminder: ProjectReminderDTO;
  open: boolean;
  setOpen: (val: boolean) => void;
}

export function DeleteProjectReminderDialog({
  open,
  setOpen,
  projectReminder,
}: DeleteProjectReminderDialogProps) {
  const { mutate, isPending } = projectReminderApiHooks.useDelete({
    onError: () => toast.error('Не удалось удалить уведомление. Попробуйте позже.'),
    onSuccess: () => {
      toast.success('Уведомление успешно удалено');
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mt-3">Вы уверены что хотите удалить это напоминание?</DialogTitle>
          <DialogDescription className="italic">{projectReminder.text}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2">
          <DialogClose
            disabled={isPending}
            className={buttonVariants({
              variant: 'secondary',
            })}
          >
            Отменить
          </DialogClose>
          <Button
            disabled={isPending}
            variant="destructive"
            onClick={() => {
              mutate(projectReminder.documentId);
            }}
          >
            Удалить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
