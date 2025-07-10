import { EditProjectForm } from '@/features/edit-project/ui/edit-project-form';
import { ProjectReminderList } from '@/features/project-reminder/ui/project-reminder-list';
import { PageParams } from '@/shared/types/next';
import { PageTitle } from '@/shared/ui/page-title';

export default async function ProjectEditPage({ params }: PageParams<{ id: string }>) {
  const { id } = await params;

  return (
    <div>
      <PageTitle>Редактировать проект</PageTitle>
      <EditProjectForm projectId={id} />
      <ProjectReminderList projectId={id} />
    </div>
  );
}
