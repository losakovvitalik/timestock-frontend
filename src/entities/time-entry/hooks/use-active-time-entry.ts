import { useUser } from '@/entities/user/hooks/use-user';
import { timeEntryApiHooks } from '../api/time-entry-api-hooks';

export const activeTimeEntryKey = ['active'];

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
        task: true,
      },
    },
    options: {
      queryKey: activeTimeEntryKey,
      select: (res) => res.data[0] || null,
      enabled: Boolean(userId),
      refetchOnWindowFocus: true,
      refetchOnMount: false,
    },
  });
}
