import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { taskSchema, TaskSchemaType } from '../model/task-schema';

export interface UseTaskFormOptions {
  defaultValues?: TaskSchemaType;
}

export function useTaskForm(opt?: UseTaskFormOptions) {
  return useForm<TaskSchemaType>({
    resolver: zodResolver(taskSchema),
    defaultValues: opt?.defaultValues,
  });
}
