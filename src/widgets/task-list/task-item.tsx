import { TaskDTO } from '@/entities/task/model/task-types';
import { StartTaskTimerButton } from '@/features/task/start-task-timer/ui/start-task-timer-button';
import { formatDisplayDate } from '@/shared/lib/date/format-display-date';
import { cn } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { TooltipButton } from '@/shared/ui/tooltip-button';
import { Typography } from '@/shared/ui/typography';
import { Check, Clipboard, ClipboardClock, Edit3, Trash } from 'lucide-react';
import { TaskItemProgress } from './task-item-progress';

export interface TaskItemProps {
  item: TaskDTO;
}

export function TaskItem({ item }: TaskItemProps) {
  const { name, description, project } = item;

  return (
    <Card
      className={cn('border-none', {
        'py-6': !description,
      })}
    >
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="flex flex-1 items-center gap-2">
            <TooltipButton title="Отменить выполненной">
              <Button className="size-8 rounded-full" size={'icon'} variant={'secondary'}>
                <Check className="size-4" />
              </Button>
            </TooltipButton>
            <Typography variant={'important'}>{name}</Typography>
            <Badge variant={'secondary'}>
              {project && (
                <div
                  className="size-2.5 rounded-full"
                  style={{
                    backgroundColor: project?.color.hex,
                  }}
                />
              )}
              <Typography size={'xs'}>{project ? project?.name : 'Проект не указан'}</Typography>
            </Badge>
          </div>
          <TaskItemProgress task={item} />

          <div className="flex gap-4">
            {/* <div className="w-max text-sm">
              {formatDisplayDate(item.createdAt)}{' '}
              {item.due_date ? `- ${formatDisplayDate(item.due_date)}` : null}
            </div> */}
            <div className="flex w-max flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Clipboard className="size-3" />
                {formatDisplayDate(item.createdAt)}
              </div>
              {item.due_date && (
                <div className="flex items-center gap-2">
                  <ClipboardClock className="size-3" />
                  {formatDisplayDate(item.due_date)}
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="flex gap-2">
              <StartTaskTimerButton task={item} />

              <TooltipButton title="Редактировать">
                <Button className="size-8" size={'icon'} variant={'secondary'}>
                  <Edit3 />
                </Button>
              </TooltipButton>

              <TooltipButton title="Удалить">
                <Button className="size-8" size={'icon'} variant={'default'}>
                  <Trash />
                </Button>
              </TooltipButton>
            </div>
          </div>
        </div>
        {description && (
          <Typography className="mt-2" variant={'muted'} size={'sm'}>
            {description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
