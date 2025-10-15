'use client';

import { TaskList } from '@/widgets/task-list/ui/task-list';
import { TaskListPanel } from '@/widgets/task-list/ui/task-list-panel';
import { TASK_STATUSES, TaskStatus } from '@/widgets/task-list/ui/task-list-status-filter';
import { parseAsString, parseAsStringEnum, useQueryStates } from 'nuqs';

export function TasksPageClient() {
  const [params, setParams] = useQueryStates({
    status: parseAsStringEnum(Object.values(TASK_STATUSES)).withDefault(
      TASK_STATUSES.NOT_COMPLETED,
    ),
    sort: parseAsString.withDefault('createdAt:asc'),
    search: parseAsString.withDefault(''),
    project: parseAsString,
  });

  const handleStatusChange = (status: TaskStatus) => {
    setParams((prev) => ({ ...prev, status }), { shallow: true });
  };

  const handleSearch = (raw: string) => {
    const q = raw.trim();
    setParams(
      (prev) => {
        return {
          ...prev,
          search: q === '' ? null : q, // null => удалить ?search
        };
      },
      { shallow: true },
    );
  };

  const handleSortChange = (sort: string | null) => {
    if (sort) {
      setParams((prev) => ({ ...prev, sort }), { shallow: true });
    }
  };

  const handleProjectChange = (project: string | null) => {
    setParams((prev) => ({ ...prev, project }), { shallow: true });
  };

  return (
    <div>
      <TaskListPanel
        statusValue={params.status}
        onStatusChange={handleStatusChange}
        searchDefaultValue={params.search || undefined}
        onSearchChange={handleSearch}
        sortValue={params.sort}
        onSortChange={handleSortChange}
        projectValue={params.project}
        onProjectChange={handleProjectChange}
      />
      <TaskList params={params} />
    </div>
  );
}
