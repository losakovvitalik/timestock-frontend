'use client';

import { SearchInput, SearchInputProps } from '@/shared/ui/search-input';

export interface ProjectsSearchInputProps extends Pick<
  SearchInputProps,
  'onSearch' | 'defaultValue' | 'className' | 'containerClassName'
> {}

export function ProjectsSearchInput(props: ProjectsSearchInputProps) {
  return <SearchInput autoComplete="off" placeholder="Введите название проекта" {...props} />;
}
