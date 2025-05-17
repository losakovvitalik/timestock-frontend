import { ProjectsSearchInput } from '@/entities/project/ui/projects-search-input';
import { CreateProjectLink } from '@/features/create-project/ui/create-project-link';
import { PageTitle } from '@/shared/ui/page-title';
import { ProjectList } from '@/widgets/project-list/project-list';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Проекты',
};

export default function ProjectsPage() {
  return (
    <div>
      <PageTitle>Проекты</PageTitle>
      <ProjectsSearchInput />

      <ProjectList />

      <div className="fixed bottom-20 left-1/2 -translate-x-1/2">
        <CreateProjectLink />
      </div>
    </div>
  );
}
