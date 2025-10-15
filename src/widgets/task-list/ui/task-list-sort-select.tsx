import Select from '@/shared/ui/select';

const sortOptions = [
  {
    label: 'Сначала новые',
    value: 'createdAt:desc',
  },
  {
    label: 'Сначала старые',
    value: 'createdAt:asc',
  },
];

export interface TaskListSortSelectProps {
  onOrderChange: (order: string | null) => void;
  value: string | null;
}

export function TaskListSortSelect({ onOrderChange, value }: TaskListSortSelectProps) {
  return (
    <Select
      labelKey="label"
      valueKey={'value' as const}
      searchable={false}
      className="h-9 w-auto"
      renderItem={(item) => item.label}
      placeholder="Выберите сортировку"
      onChange={onOrderChange}
      value={value}
      options={sortOptions}
    />
  );
}
