import { useUser } from '@/entities/user/hooks/use-user';
import { useQuery } from '@tanstack/react-query';
import { timeEntryGetActive } from '../api/time-entry-get-active';

export const useActiveTimeEntryKey = ['active-time-entry'];

export function useActiveTimeEntry() {
  const user = useUser();
  const userId = user.data?.id;

  return useQuery({
    queryKey: ['active-time-entry', userId],
    queryFn: () => {
      return timeEntryGetActive({
        user: userId,
      });
    },
    enabled: Boolean(userId),
  });
}
