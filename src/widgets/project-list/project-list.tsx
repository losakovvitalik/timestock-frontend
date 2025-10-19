'use client';

import { projectApiHooks } from '@/entities/project/api/project-api-hooks';
import { ProjectDTO } from '@/entities/project/models/types';
import { useUser } from '@/entities/user/hooks/use-user';
import { ApiGetParams } from '@/shared/types/api';
import { Loader } from '@/shared/ui/loader';
import { ProjectListItem } from './project-list-item';

export interface ProjectListProps {
  params?: {
    search?: string;
  };
}

export function ProjectList({ params: propsParams }: ProjectListProps) {
  const { user } = useUser();

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

  return (
    <ul className="mt-2 flex flex-col gap-3">
      {projects?.data.map((project) => (
        <ProjectListItem key={project.documentId} project={project} />
      ))}
      {isProjectsLoading && <Loader className="mx-auto" />}
    </ul>
  );
}
