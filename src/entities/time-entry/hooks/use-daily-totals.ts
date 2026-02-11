import { $api } from '@/shared/api/base';
import { useQuery } from '@tanstack/react-query';

interface DailyTotal {
  date: string;
  total_duration: number;
}

interface DailyTotalsResponse {
  data: DailyTotal[];
}

interface UseDailyTotalsParams {
  from?: string;
  to?: string;
  enabled?: boolean;
}

export function useDailyTotals({ from, to, enabled = true }: UseDailyTotalsParams = {}) {
  return useQuery({
    queryKey: ['timeEntry', 'dailyTotals', from, to],
    queryFn: () =>
      $api
        .get<DailyTotalsResponse>('/time-entries/daily-totals', {
          params: { from, to },
        })
        .then((r) => {
          const map = new Map<string, number>();
          for (const item of r.data.data) {
            map.set(item.date, item.total_duration);
          }
          return map;
        }),
    enabled,
  });
}
