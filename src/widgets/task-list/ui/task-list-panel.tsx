'use client';

import { CreateTaskDialog } from '@/features/task/create-task/ui/create-task-dialog';
import {
  TaskListProjectSelect,
  TaskListProjectSelectProps,
} from '@/widgets/task-list/ui/task-list-project-select';
import { TaskListSearch, TaskListSearchProps } from '@/widgets/task-list/ui/task-list-search';
import {
  TaskListSortSelect,
  TaskListSortSelectProps,
} from '@/widgets/task-list/ui/task-list-sort-select';
import {
  TaskListStatusFilter,
  TaskListStatusFilterProps,
} from '@/widgets/task-list/ui/task-list-status-filter';

export interface TaskListPanelProps {
  statusValue: TaskListStatusFilterProps['value'];
  onStatusChange: TaskListStatusFilterProps['onValueChange'];

  searchDefaultValue: TaskListSearchProps['defaultValue'];
  onSearchChange: TaskListSearchProps['onSearch'];

  sortValue: TaskListSortSelectProps['value'];
  onSortChange: TaskListSortSelectProps['onOrderChange'];

  projectValue: TaskListProjectSelectProps['value'];
  onProjectChange: TaskListProjectSelectProps['onProjectSelect'];

  defaultProject?: string | null;
}

export function TaskListPanel({
  statusValue,
  onStatusChange,
  searchDefaultValue,
  onSearchChange,
  sortValue,
  onSortChange,
  projectValue,
  onProjectChange,
  defaultProject,
}: TaskListPanelProps) {
  return (
    <div className="flex items-center gap-2">
      <TaskListStatusFilter onValueChange={onStatusChange} value={statusValue} />
      <TaskListSearch onSearch={onSearchChange} defaultValue={searchDefaultValue} />
      <TaskListSortSelect onOrderChange={onSortChange} value={sortValue} />
      <TaskListProjectSelect onProjectSelect={onProjectChange} value={projectValue} />
      <CreateTaskDialog defaultProject={defaultProject} />
    </div>
  );
}
