import { EditProjectForm } from '@/features/edit-project/ui/edit-project-form';
import { PageProps } from '@/shared/types/next';
import { PageTitle } from '@/shared/ui/page-title';
import { ProjectReminderList } from '@/widgets/reminder-list/project-reminder-list';

export default async function ProjectEditPage({ params }: PageProps<{ id: string }>) {
  const { id } = await params;

  return (
    <div>
      <PageTitle>Редактировать проект</PageTitle>
      <EditProjectForm projectId={id} />
      <ProjectReminderList projectId={id} />
    </div>
  );
}
