'use client';

import { projectApiHooks } from '@/entities/project/api/project-api-hooks';
import { ProjectPayload } from '@/entities/project/models/types';
import { ProjectForm } from '@/entities/project/ui/project-form';
import { Loader } from '@/shared/ui/loader';
import { toast } from 'sonner';

export interface EditProjectFormProps {
  projectId: string;
}

export function EditProjectForm({ projectId }: EditProjectFormProps) {
  const project = projectApiHooks.useGet(projectId, {
    params: {
      populate: {
        color: true,
      },
    },
  });
  const updateProject = projectApiHooks.useUpdate({
    onSuccess: () => {
      toast.success('Проект успешно изменен');
    },
  });

  const onSubmit = (data: ProjectPayload) => {
    return updateProject.mutateAsync({ id: projectId, data });
  };

  if (project.isLoading) {
    return <Loader absolute />;
  }

  return <ProjectForm onSubmit={onSubmit} defaultValues={project.data} />;
}
