import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { projectFormSchema } from '../models/create-project-form-schema';

export function useProjectForm() {
  return useForm({
    resolver: zodResolver(projectFormSchema),
  });
}
