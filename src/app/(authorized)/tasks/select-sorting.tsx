'use client';

import Select from '@/shared/ui/select';
import { ArrowDown, ArrowUp } from 'lucide-react';

export function SelectSorting() {
  return (
    <Select
      labelKey="label"
      valueKey="value"
      searchable={false}
      className="h-9 w-auto"
      renderItem={(item) => item.label}
      placeholder="Выберите сортировку"
      options={[
        {
          label: (
            <div className="flex items-center gap-0.5">
              По дате создания <ArrowDown />
            </div>
          ),
          value: 'date:desc',
        },
        {
          label: (
            <div className="flex items-center gap-0.5">
              По дате создания <ArrowUp />
            </div>
          ),
          value: 'date:asc',
        },
      ]}
    />
  );
}
