import { useQuery } from '@tanstack/react-query';
import { projectGetAll, ProjectGetAllParams } from '../api/project-get-all';

export const useProjectGetAllKey = ['project', 'all'];

export function useProjectGetAll(params?: ProjectGetAllParams) {
  return useQuery({
    queryKey: [...useProjectGetAllKey, JSON.stringify(params)],
    queryFn: () => projectGetAll(params),
  });
}
