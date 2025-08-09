import { projectReminderApiHooks } from '@/entities/project-reminder/api/project-reminder-api-hooks';
import {
  ProjectReminderDTO,
  ProjectReminderPayload,
} from '@/entities/project-reminder/model/types';
import { ProjectReminderForm } from '@/entities/project-reminder/ui/project-reminder-form';
import { Button, buttonVariants } from '@/shared/ui/button';
import { ResponsiveModal } from '@/shared/ui/responsive-modal';
import { PropsWithChildren } from 'react';
import { toast } from 'sonner';

export interface EditProjectReminderDialogProps {
  projectReminder: ProjectReminderDTO;
  open: boolean;
  setOpen: (val: boolean) => void;
}

export function EditProjectReminderDialog({
  projectReminder,
  open,
  setOpen,
}: PropsWithChildren<EditProjectReminderDialogProps>) {
  const { mutateAsync } = projectReminderApiHooks.useUpdate({
    onError: () => toast.error('Не удалось изменить уведомление. Попробуйте позже.'),
    onSuccess: () => {
      toast.success('Уведомление успешно изменено');
      setOpen(false);
    },
  });

  const handleSubmit = (data: Omit<ProjectReminderPayload, 'project'>) => {
    return mutateAsync({
      id: projectReminder.documentId,
      data: {
        ...data,
      },
    });
  };

  return (
    <ResponsiveModal
      open={open}
      setOpen={setOpen}
      title="Редактирование напоминания"
      description={projectReminder.text}
    >
      <ProjectReminderForm
        onSubmit={handleSubmit}
        defaultValues={projectReminder}
        renderActions={({ isSubmitting }) => (
          <div className="grid grid-cols-2 gap-4">
            <Button
              disabled={isSubmitting}
              onClick={() => setOpen(false)}
              type="button"
              className={buttonVariants({
                variant: 'secondary',
              })}
            >
              Отменить
            </Button>

            <Button disabled={isSubmitting}>Сохранить</Button>
          </div>
        )}
      />
    </ResponsiveModal>
  );
}
