'use client';

import { projectApiHooks } from '@/entities/project/api/project-api-hooks';
import { ProjectDTO } from '@/entities/project/models/types';
import { useUser } from '@/entities/user/hooks/use-user';
import { ApiGetParams } from '@/shared/types/api';
import { ProjectListEmptyState } from './project-list-empty-state';
import { ProjectListItem } from './project-list-item';
import { ProjectListSearchEmptyState } from './project-list-search-empty-state';
import { ProjectListSkeleton } from './project-list-skeleton';

export interface ProjectListProps {
  params?: {
    search?: string;
  };
}

export function ProjectList({ params: propsParams }: ProjectListProps) {
  const { user, isLoading: isUserLoading } = useUser();

  const params: ApiGetParams<ProjectDTO> = {
    populate: {
      color: true,
    },
    filters: {
      owner: {
        id: user?.id,
      },
      ...(propsParams?.search
        ? {
            name: {
              $containsi: propsParams?.search,
            },
          }
        : {}),
    },
  };

  const { data: projects, isLoading: isProjectsLoading } = projectApiHooks.useList({
    params: params,
    options: {
      enabled: Boolean(user?.id),
      queryKey: projectApiHooks.keys.list(params),
    },
  });

  if (isUserLoading || isProjectsLoading) {
    return <ProjectListSkeleton />;
  }

  const isEmpty = !projects?.data || projects.data.length === 0;

  if (isEmpty) {
    return propsParams?.search ? <ProjectListSearchEmptyState /> : <ProjectListEmptyState />;
  }

  return (
    <ul className="mt-2 flex flex-col gap-3">
      {projects.data.map((project) => (
        <ProjectListItem key={project.documentId} project={project} />
      ))}
    </ul>
  );
}
