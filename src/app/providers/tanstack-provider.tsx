'use client';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PropsWithChildren } from 'react';
import toast from 'react-hot-toast';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.error(error);
      if (error instanceof AxiosError) {
        const isServerAvailable = !error.response?.data || (error.status && error.status >= 500);

        if (isServerAvailable) {
          toast.error('Ошибка при получение данных с сервера. Мы уже работаем над этим', {
            duration: 10 * 1000,
            id: 'global-error',
          });
          return;
        }
      }

      toast.error('Не удалось получить данные. Мы уже работаем над этим', {
        duration: 10 * 1000,
        id: 'global-error',
      });
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: () => {
        toast.error('Что-то пошло не так.');
      },
    },
  },
});

export function TanstackProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools  /> */}
    </QueryClientProvider>
  );
}
