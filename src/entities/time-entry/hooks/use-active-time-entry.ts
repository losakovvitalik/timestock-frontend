import { useUser } from '@/entities/user/hooks/use-user';
import { entities } from '@/shared/api/entities';
import { timeEntryApiHooks } from '../api/time-entry-api-hooks';

export const activeTimeEntryKey = [entities.timeEntry.key, 'list', 'active'];

export function useActiveTimeEntry() {
  const { user } = useUser();
  const userId = user?.id;

  return timeEntryApiHooks.useList({
    params: {
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
    options: {
      queryKey: activeTimeEntryKey,
      select: (res) => res.data[0] || null,
      enabled: Boolean(userId),
      refetchOnWindowFocus: true,
      gcTime: 15 * 1000,
    },
  });
}
