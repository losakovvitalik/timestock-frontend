'use client';
import { projectReminderApiHooks } from '@/entities/project-reminder/api/project-reminder-api-hooks';
import { ProjectReminderDTO } from '@/entities/project-reminder/model/types';
import { ProjectReminderForm } from '@/entities/project-reminder/ui/project-reminder-form';

export interface EditProjectReminderFormProps {
  reminder: ProjectReminderDTO;
}

export function EditProjectReminderForm({ reminder }: EditProjectReminderFormProps) {
  const update = projectReminderApiHooks.useUpdate();

  return (
    <ProjectReminderForm
      defaultValues={reminder}
      onSubmit={async (data) => update.mutateAsync({ data: data, id: reminder.documentId })}
    />
  );
}
