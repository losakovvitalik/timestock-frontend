'use client';

import { taskApiHooks } from '@/entities/task/api/task-api-hooks';
import { useUser } from '@/entities/user/hooks/use-user';
import { extractInfiniteData } from '@/shared/lib/react-query/extract-infinite-data';
import { Typography } from '@/shared/ui/typography';
import { TaskItem } from './task-item';

interface TaskListProps {
  isCompleted?: boolean;
}

export function TaskList({ isCompleted }: TaskListProps) {
  const { user } = useUser();
  const { data } = taskApiHooks.useInfinityList({
    params: {
      filters: {
        author: {
          documentId: user?.documentId,
        },
        is_completed: isCompleted,
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

  return (
    <ul className="mt-2 flex flex-col gap-3">
      {flatData.length === 0 && <Typography variant="subtitle">У вас ещё нет задач</Typography>}
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
