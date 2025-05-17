import { useQuery } from '@tanstack/react-query';
import { projectGetAll, ProjectGetALlParams } from '../api/project-get-all';

export const useProjectGetAllKey = ['project', 'all'];

export function useProjectGetAll(params?: ProjectGetALlParams) {
  return useQuery({
    queryKey: [...useProjectGetAllKey, JSON.stringify(params)],
    queryFn: () => projectGetAll(params),
  });
}
