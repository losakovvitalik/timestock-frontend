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
    <div className="relative h-full">
      <PageTitle>Проекты</PageTitle>
      <ProjectsSearchInput />

      <ProjectList />

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 lg:bottom-10">
        <CreateProjectLink />
      </div>
    </div>
  );
}
