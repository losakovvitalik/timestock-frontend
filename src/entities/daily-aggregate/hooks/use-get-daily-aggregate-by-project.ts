import { ApiCollectionResponse } from '@/shared/types/api';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  getDailyAggregateByProject,
  GetDailyAggregateByProjectParams,
} from '../api/get-daily-aggregate-by-project';
import { DailyAggregateDTO } from '../model/types';

type Response = ApiCollectionResponse<DailyAggregateDTO>;

export function useGetDailyAggregateByProject(
  params: GetDailyAggregateByProjectParams,
  options?: Omit<UseQueryOptions<Response, unknown, Response>, 'queryKey' | 'queryFn'>,
) {
  return useQuery<Response, unknown, Response>({
    queryKey: ['daily-aggregate', 'by-project', JSON.stringify(params)],
    queryFn: () => getDailyAggregateByProject(params),
    ...options,
  });
}
