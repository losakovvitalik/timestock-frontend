'use client';

import { projectApiHooks } from '@/entities/project/api/project-api-hooks';
import { ProjectListItem } from './project-list-item';

export function ProjectList() {
  const { data: projects } = projectApiHooks.useList({
    populate: {
      color: true,
    },
  });

  return (
    <ul className="mt-2 flex flex-col gap-3">
      {projects?.data.map((project) => (
        <ProjectListItem key={project.documentId} project={project} />
      ))}
    </ul>
  );
}
