import { projectCreate } from '@/entities/project/api/project-create';
import { useMutation } from '@tanstack/react-query';

export function useCreateProject() {
  return useMutation({
    mutationFn: projectCreate,
  });
}
