'use client';
import { projectReminderApiHooks } from '@/entities/project-reminder/api/project-reminder-api-hooks';
import { ProjectReminderForm } from '@/entities/project-reminder/ui/project-reminder-form';

export interface CreateProjectReminderFormProps {
  projectId: string;
}

export function CreateProjectReminderForm({ projectId }: CreateProjectReminderFormProps) {
  const create = projectReminderApiHooks.useCreate();

  return (
    <ProjectReminderForm
      onSubmit={async (data) => create.mutateAsync({ ...data, project: projectId })}
    />
  );
}
