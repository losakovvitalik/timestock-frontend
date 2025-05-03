'use client';

import { SearchInput } from '@/shared/ui/search-input';

export function ProjectsSearchInput() {
  return <SearchInput onSearch={(v) => console.log(v)} placeholder="Введите название проекта" />;
}
