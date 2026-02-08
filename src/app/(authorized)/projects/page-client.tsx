'use client';

import { ProjectsSearchInput } from '@/entities/project/ui/projects-search-input';
import { CreateProjectLink } from '@/features/create-project/ui/create-project-link';
import { ProjectList } from '@/widgets/project-list/project-list';
import { parseAsString, useQueryState } from 'nuqs';

export function ProjectsPageClient() {
  const [search, setSearch] = useQueryState('search', parseAsString);

  return (
    <div className="flex h-full flex-col">
      <div className="flex w-full gap-2">
        <ProjectsSearchInput
          containerClassName="flex-1"
          onSearch={(value) => setSearch(value || null)}
          defaultValue={search || ''}
        />
        <CreateProjectLink className="h-9 rounded-md" />
      </div>

      <ProjectList
        params={{
          search: search || undefined,
        }}
      />

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 sm:hidden">
        <CreateProjectLink />
      </div>
    </div>
  );
}
