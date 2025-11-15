import { ProjectsPageClient } from '@/app/(authorized)/projects/page-client';
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
    </div>
  );
}
