import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { userGetMe, UserGetMeResponse } from '../api/user-get-me';

export const useUserKey = ['me'];
const STORAGE_KEY = 'me';

export function useUser() {
  const cached: UserGetMeResponse = (() => {
    try {
      const json = localStorage.getItem(STORAGE_KEY);
      return json ? JSON.parse(json) : undefined;
    } catch {
      return undefined;
    }
  })();

  const query = useQuery({
    queryKey: useUserKey,
    queryFn: userGetMe,
    initialData: cached,
  });

  useEffect(() => {
    if (query.isSuccess) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(query.data));
      } catch {}
    }
  }, [query.data, query.isSuccess]);

  return query;
}
