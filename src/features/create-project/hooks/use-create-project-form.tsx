import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createProjectFormSchema } from '../models/create-project-form-schema';

export const useCreateProjectForm = () => {
  return useForm({
    resolver: zodResolver(createProjectFormSchema),
  });
};
