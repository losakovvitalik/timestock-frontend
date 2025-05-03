'use client';

import { ProjectForm } from '@/entities/project/ui/project-form';
import { useCreateProject } from '../hooks/use-create-project';

export function CreateProjectForm() {
  const createProject = useCreateProject();

  return <ProjectForm onSubmit={createProject.mutate} />;
}
