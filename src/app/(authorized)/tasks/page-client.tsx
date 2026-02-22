'use client';

import type { TaskStatus } from '@/widgets/task-list';
import { TASK_STATUSES, TaskList, TaskListPanel } from '@/widgets/task-list';
import { parseAsString, parseAsStringEnum, useQueryStates } from 'nuqs';
import { useLocalStorage } from 'usehooks-ts';

const TASK_PROJECT_STORAGE_KEY = 'task-list-project';

export function TasksPageClient() {
  const [params, setParams] = useQueryStates({
    status: parseAsStringEnum(Object.values(TASK_STATUSES)).withDefault(
      TASK_STATUSES.NOT_COMPLETED,
    ),
    sort: parseAsString.withDefault('createdAt:asc'),
    search: parseAsString.withDefault(''),
  });

  const [project, setProject] = useLocalStorage<string | null>(TASK_PROJECT_STORAGE_KEY, null);

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

  return (
    <div className="flex h-full flex-col">
      <TaskListPanel
        statusValue={params.status}
        onStatusChange={handleStatusChange}
        searchDefaultValue={params.search || undefined}
        onSearchChange={handleSearch}
        sortValue={params.sort}
        onSortChange={handleSortChange}
        projectValue={project}
        onProjectChange={setProject}
        defaultProject={project}
      />
      <TaskList params={{ ...params, project }} />
    </div>
  );
}
