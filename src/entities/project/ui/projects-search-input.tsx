'use client';

import { useQueryParams } from '@/shared/hooks/use-query-params';
import { SearchInput } from '@/shared/ui/search-input';
import { useCallback } from 'react';

export function ProjectsSearchInput() {
  const { set } = useQueryParams();

  const onChange = useCallback(
    (v: string) => {
      console.log('called');
      set({ search: v });
    },
    [set],
  );

  return <SearchInput onSearch={onChange} placeholder="Введите название проекта" />;
}
