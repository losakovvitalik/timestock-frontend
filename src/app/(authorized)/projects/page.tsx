import { ProjectsPageClient } from '@/app/(authorized)/projects/page-client';
import { CreateProjectLink } from '@/features/create-project/ui/create-project-link';
import { PageTitle } from '@/shared/ui/page-title';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Проекты',
};

export default function ProjectsPage() {
  return (
    <div className="relative h-full">
      <PageTitle>Проекты</PageTitle>

      <ProjectsPageClient />

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <CreateProjectLink />
      </div>
    </div>
  );
}
