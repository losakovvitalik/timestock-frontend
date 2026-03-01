'use client';

import { taskApiHooks } from '@/entities/task';
import { useUser } from '@/entities/user';
import { extractInfiniteData } from '@/shared/lib/react-query/extract-infinite-data';
import { Skeleton } from '@/shared/ui/skeleton';
import { TaskItem } from '@/widgets/task-list/ui/task-item/task-item';
import { TaskListEmptyState } from '@/widgets/task-list/ui/task-list-empty-state';
import { TASK_STATUSES, TaskStatus } from '@/widgets/task-list/ui/task-list-status-filter';
import { buildTaskFilter } from '@/widgets/task-list/utils/build-task-filter';

export interface TaskListProps {
  params: {
    status: TaskStatus;
    sort: string;
    search: string;
    project: string | null;
  };
}

export function TaskList({ params: { status, search, sort, project } }: TaskListProps) {
  const { user } = useUser();

  const highlightImportant = status === TASK_STATUSES.NOT_COMPLETED || status === TASK_STATUSES.ALL;

  const [sortKey, sortOrder] = sort.split(':');
  const sortRules = highlightImportant
    ? [`is_important:desc`, `${sortKey}:${sortOrder}`]
    : [`${sortKey}:${sortOrder}`];

  const { data, isLoading } = taskApiHooks.useInfinityList({
    params: {
      filters: {
        author: {
          documentId: user?.documentId,
        },
        is_archived: false,
        ...buildTaskFilter({ status, search, project }),
      },
      sort: sortRules,
      populate: {
        project: {
          populate: {
            color: true,
          },
        },
      },
    },
  });

  const flatData = extractInfiniteData(data);

  if (!isLoading && flatData.length === 0) {
    return (
      <div className="h-full flex-1">
        <TaskListEmptyState />
      </div>
    );
  }

  return (
    <ul className="mt-2 flex flex-col gap-3">
      {isLoading && (
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={index}>
              <Skeleton className="h-14 rounded-xl" />
            </li>
          ))}
        </>
      )}
      {flatData.map((item) => {
        return (
          <li key={item.documentId}>
            <TaskItem item={item} highlightImportant={highlightImportant} />
          </li>
        );
      })}
    </ul>
  );
}
