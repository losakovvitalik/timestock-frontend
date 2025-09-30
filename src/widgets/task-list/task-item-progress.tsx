import { TaskDTO } from '@/entities/task/model/task-types';
import { round } from '@/shared/lib/math/round';
import { cn } from '@/shared/lib/utils';
import { formatDuration } from '@/shared/utils/duration';

export interface TaskItemProgressProps {
  task: TaskDTO;
}

export function TaskItemProgress({ task: { time_spent, estimated_time } }: TaskItemProgressProps) {
  return (
    <div
      className={cn('ml-auto grid max-w-72 grid-cols-[1fr] items-center gap-3', {
        'w-full': estimated_time,
      })}
    >
      <div>
        {formatDuration(time_spent || 0, 'HH:mm')}
        {estimated_time ? ' / ' + formatDuration(estimated_time, 'HH:mm') : null} ч.
      </div>
      {estimated_time && (
        <div className="bg-secondary h-3 rounded-md">
          <div
            style={{
              width: `${Math.min(round((time_spent || 0) / estimated_time) * 100, 100)}%`,
            }}
            className="bg-primary h-full w-1/2 rounded-md"
          />
        </div>
      )}
    </div>
  );
}
