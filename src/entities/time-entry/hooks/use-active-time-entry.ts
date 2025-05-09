import { useUser } from '@/entities/user/hooks/use-user';
import { timeEntryApiHooks } from '../api/time-entry-api-hooks';
import { TimeEntry } from '../model/types';

export const useActiveTimeEntryKey = ['active-time-entry'];

export function useActiveTimeEntry() {
  const user = useUser();
  const userId = user.data?.id;

  return timeEntryApiHooks.useList<TimeEntry | null>(
    {
      filters: {
        user: userId,
        end_time: {
          $null: true,
        },
      },
      populate: {
        project: true,
      },
    },
    {
      select: (res) => res.data[0] || null,
      enabled: Boolean(userId),
    },
  );
}
