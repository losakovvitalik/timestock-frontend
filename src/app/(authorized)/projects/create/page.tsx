import { CreateProjectForm } from '@/features/create-project/ui/create-project-form';
import { PageTitle } from '@/shared/ui/page-title';

export default function ProjectCreatePage() {
  return (
    <div>
      <PageTitle>Создать проект</PageTitle>
      <CreateProjectForm />
    </div>
  );
}
