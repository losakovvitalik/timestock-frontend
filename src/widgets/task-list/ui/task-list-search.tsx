import { cn } from '@/shared/lib/utils';
import { SearchInput, SearchInputProps } from '@/shared/ui/search-input';

export interface TaskListSearchProps
  extends Pick<SearchInputProps, 'onSearch' | 'className' | 'defaultValue'> {}

export function TaskListSearch({ onSearch, className, defaultValue }: TaskListSearchProps) {
  return (
    <SearchInput
      onSearch={onSearch}
      className={cn('flex- h-9', className)}
      containerClassName="flex-1"
      placeholder="Поиск задач"
      defaultValue={defaultValue}
    />
  );
}
