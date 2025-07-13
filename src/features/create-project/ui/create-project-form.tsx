'use client';

import { projectApiHooks } from '@/entities/project/api/project-api-hooks';
import { ProjectForm } from '@/entities/project/ui/project-form';
import { paths } from '@/shared/constants';
import { useRouter } from 'next/navigation';

export function CreateProjectForm() {
  const router = useRouter();

  const createProject = projectApiHooks.useCreate({});

  return (
    <ProjectForm
      onSubmit={(values) =>
        createProject.mutateAsync(values, {
          onSuccess(data) {
            router.push(paths.projects.edit(data.documentId));
          },
        })
      }
    />
  );
}
