import { $api } from '@/shared/lib/api';

export interface GetDailyAggregateByProjectParams {
  projectId: string;
  from: string;
  to: string;
}

export async function getDailyAggregateByProject(params: GetDailyAggregateByProjectParams) {
  const res = await $api.get('/daily-aggregates/by-project', {
    params: params,
  });

  return res.data;
}
