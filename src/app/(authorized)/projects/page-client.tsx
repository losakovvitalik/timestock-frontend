'use client';

import { ProjectsSearchInput } from '@/entities/project/ui/projects-search-input';
import { ProjectList } from '@/widgets/project-list/project-list';
import { parseAsString, useQueryState } from 'nuqs';

export function ProjectsPageClient() {
  const [search, setSearch] = useQueryState('search', parseAsString);

  return (
    <>
      <ProjectsSearchInput onSearch={setSearch} defaultValue={search || ''} />

      <ProjectList
        params={{
          search: search || undefined,
        }}
      />
    </>
  );
}
