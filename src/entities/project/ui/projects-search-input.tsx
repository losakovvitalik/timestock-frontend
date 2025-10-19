'use client';

import { SearchInput, SearchInputProps } from '@/shared/ui/search-input';

export interface ProjectsSearchInputProps
  extends Pick<SearchInputProps, 'onSearch' | 'defaultValue'> {}

export function ProjectsSearchInput(props: ProjectsSearchInputProps) {
  return <SearchInput placeholder="Введите название проекта" {...props} />;
}
