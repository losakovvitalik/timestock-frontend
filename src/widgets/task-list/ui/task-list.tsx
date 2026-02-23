'use client';

import { taskApiHooks } from '@/entities/task/api/task-api-hooks';
import { useUser } from '@/entities/user/hooks/use-user';
import { extractInfiniteData } from '@/shared/lib/react-query/extract-infinite-data';
import { Skeleton } from '@/shared/ui/skeleton';
import { TaskItem } from '@/widgets/task-list/ui/task-item/task-item';
import { TaskListEmptyState } from '@/widgets/task-list/ui/task-list-empty-state';
import { TaskStatus } from '@/widgets/task-list/ui/task-list-status-filter';
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

  const [sortKey, sortOrder] = sort.split(':');
  const { data, isLoading } = taskApiHooks.useInfinityList({
    params: {
      filters: {
        author: {
          documentId: user?.documentId,
        },
        ...buildTaskFilter({ status, search, project }),
        is_archived: false,
      },
      sort: {
        is_important: 'desc',
        [sortKey]: sortOrder,
      },
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
            <TaskItem item={item} />
          </li>
        );
      })}
    </ul>
  );
}
