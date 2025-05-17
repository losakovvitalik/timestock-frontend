import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { projectFormSchema } from '../models/create-project-form-schema';
import { Project } from '../models/types';

export interface UseProjectFormProps {
  defaultValues?: Partial<Project>;
}

export function useProjectForm({ defaultValues }: UseProjectFormProps) {
  return useForm({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      color: defaultValues?.color?.documentId,
      description: defaultValues?.description || undefined,
      name: defaultValues?.name,
    },
  });
}
