import { TaskListProps } from '@/widgets/task-list/ui/task-list';
import { TASK_STATUSES } from '@/widgets/task-list/ui/task-list-status-filter';

interface BuildTaskFilterParams extends Omit<TaskListProps['params'], 'sort'> {}

export function buildTaskFilter({ status, search, project }: BuildTaskFilterParams) {
  const filters: Record<string, any> = {};

  switch (status) {
    case TASK_STATUSES.NOT_COMPLETED:
      filters.is_completed = false;
      break;
    case TASK_STATUSES.COMPLETED:
      filters.is_completed = true;
      break;
  }

  if (search) {
    filters.name = {
      $containsi: search,
    };
  }

  if (project) {
    filters.project = {
      documentId: project,
    };
  }

  return filters;
}
