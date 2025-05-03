import { ProjectsSearchInput } from '@/entities/project/ui/projects-search-input';
import { CreateProjectLink } from '@/features/create-project/ui/create-project-link';
import { PageTitle } from '@/shared/ui/page-title';
import { Typography } from '@/shared/ui/typography';
import { Edit } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Проекты',
};

export default function ProjectsPage() {
  return (
    <div>
      <PageTitle>Проекты</PageTitle>
      <ProjectsSearchInput />

      <div className="mt-4 flex flex-col gap-2">
        <div className="bg-secondary border-border flex items-center gap-2 rounded-lg border p-2">
          <div className="size-4 rounded-full bg-yellow-200" />
          <Typography className="text-lg font-semibold">Timestock</Typography>
          <Edit className="ml-auto size-5" />
        </div>
        <div className="bg-secondary border-border flex items-center gap-2 rounded-lg border p-2">
          <div className="size-4 rounded-full bg-yellow-200" />
          <Typography className="text-lg font-semibold">Timestock</Typography>
          <Edit className="ml-auto size-5" />
        </div>
      </div>

      <div className="fixed bottom-20 left-1/2 -translate-x-1/2">
        <CreateProjectLink />
      </div>
    </div>
  );
}
