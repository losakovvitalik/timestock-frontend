'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { userGetMe, UserGetMeResponse } from '../api/user-get-me';

export const useUserKey = ['users', 'me'];
export const USE_USER_STORAGE_KEY = 'me';

export function useUser() {
  const [initialData, setInitialData] = useState<UserGetMeResponse | undefined>(undefined);

  useEffect(() => {
    try {
      const json = localStorage.getItem(USE_USER_STORAGE_KEY);
      const parsed = json ? JSON.parse(json) : undefined;
      // получаем кешированные данные о пользователе из ls
      if (parsed) setInitialData(parsed);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const query = useQuery({
    queryKey: useUserKey,
    queryFn: userGetMe,
    placeholderData: initialData,
    staleTime: 5 * 60000,
  });

  useEffect(() => {
    if (!query.isStale) {
      try {
        // после выполнения запроса
        // обновляем данные о пользователе в ls
      } catch {}
      localStorage.setItem(USE_USER_STORAGE_KEY, JSON.stringify(query.data));
    }
  }, [query.data, query.isStale]);

  return {
    user: query.data,
    isLoading: query.isLoading,
    isErrored: query.isError,
    isSuccess: query.isSuccess,
  };
}
