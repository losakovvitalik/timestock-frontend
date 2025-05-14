import { useUser } from '@/entities/user/hooks/use-user';
import { timeEntryApiHooks } from '../api/time-entry-api-hooks';

export const useActiveTimeEntryKey = ['active-time-entry'];

export function useActiveTimeEntry() {
  const user = useUser();
  const userId = user.data?.id;

  return timeEntryApiHooks.useList(
    {
      filters: {
        user: userId,
        end_time: {
          $null: true,
        },
      },
      populate: {
        project: {
          populate: {
            color: true,
          },
        },
      },
    },
    {
      select: (res) => res.data[0] || null,
      enabled: Boolean(userId),
      refetchOnWindowFocus: true,
    },
  );
}
