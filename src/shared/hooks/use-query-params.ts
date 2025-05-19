'use client';

import { usePathname, useRouter } from 'next/navigation';
import QueryString from 'qs';
import { useEffect } from 'react';
import { create } from 'zustand';

interface Store {
  queryParams: Record<string, any> | null;
  setQueryParams: (qp: Record<string, any> | null) => void;
  clearAll: () => void;
}

export const useQueryParamsStore = create<Store>((set) => ({
  queryParams: null,
  setQueryParams: (qp) => set({ queryParams: qp }),
  clearAll: () => set({ queryParams: null }),
}));

export function useQueryParams() {
  const pathname = usePathname();
  const router = useRouter();
  const { queryParams, clearAll, setQueryParams } = useQueryParamsStore();

  const newParams = queryParams ? QueryString.stringify(queryParams) : null;

  useEffect(() => {
    const currentQs = window.location.search.slice(1);
    if (newParams === currentQs) return;

    if (!newParams) {
      router.replace(pathname);
      return;
    }

    router.replace(`${pathname}?${newParams}`);
  }, [newParams, pathname, router]);

  return {
    set: setQueryParams,
    value: queryParams,
    clearAll,
  };
}
