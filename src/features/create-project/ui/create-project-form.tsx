'use client';

import { projectApiHooks } from '@/entities/project/api/project-api-hooks';
import { ProjectForm } from '@/entities/project/ui/project-form';

export function CreateProjectForm() {
  const createProject = projectApiHooks.useCreate();

  return <ProjectForm onSubmit={createProject.mutateAsync} />;
}
