'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { userGetMe, UserGetMeResponse } from '../api/user-get-me';

export const useUserKey = ['users', 'me'];
const STORAGE_KEY = 'me';

export function useUser() {
  const [initialData, setInitialData] = useState<UserGetMeResponse | undefined>(undefined);

  useEffect(() => {
    try {
      const json = localStorage.getItem(STORAGE_KEY);
      const parsed = json ? JSON.parse(json) : undefined;
      if (parsed) setInitialData(parsed);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const query = useQuery({
    queryKey: useUserKey,
    queryFn: userGetMe,
    enabled: initialData !== undefined,
    initialData,
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
