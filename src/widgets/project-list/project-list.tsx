'use client';

import { projectApiHooks } from '@/entities/project/api/project-api-hooks';
import { useUser } from '@/entities/user/hooks/use-user';
import { useQueryParams } from '@/shared/hooks/use-query-params';
import { Loader } from '@/shared/ui/loader';
import { ProjectListItem } from './project-list-item';

export function ProjectList() {
  const user = useUser();
  const { value } = useQueryParams();

  const search = value?.search;

  const { data: projects, isLoading: isProjectsLoading } = projectApiHooks.useList(
    {
      populate: {
        color: true,
      },
      filters: {
        owner: {
          id: user.data?.id,
        },
        name: {
          $containsi: search,
        },
      },
    },
    { enabled: Boolean(user.data?.id) },
  );

  return (
    <ul className="mt-2 flex flex-col gap-3">
      {projects?.data.map((project) => (
        <ProjectListItem key={project.documentId} project={project} />
      ))}
      {isProjectsLoading && <Loader className="mx-auto" />}
    </ul>
  );
}
