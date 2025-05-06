import { useUser } from '@/entities/user/hooks/use-user';
import { useQuery } from '@tanstack/react-query';
import { timeEntryApi } from '../api/time-entry-api';

export const useActiveTimeEntryKey = ['active-time-entry'];

export function useActiveTimeEntry() {
  const user = useUser();
  const userId = user.data?.id;

  return useQuery({
    queryKey: ['active-time-entry', userId],
    queryFn: async () => {
      const timeEntry = await timeEntryApi.list({
        filters: {
          user: userId,
          end_time: {
            $null: true,
          },
        },
        populate: {
          project: true,
        }
      });

      return timeEntry.data[0] || null;
    },
    enabled: Boolean(userId),
  });
}
