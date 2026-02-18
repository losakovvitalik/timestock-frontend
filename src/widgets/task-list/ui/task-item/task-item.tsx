import { ProjectBadge } from '@/entities/project/ui/project-badge';
import { useArchiveTask } from '@/entities/task/hooks/use-archive-task';
import { TaskDTO } from '@/entities/task/model/task-types';
import { StartTaskTimerButton } from '@/features/task/start-task-timer/ui/start-task-timer-button';
import { formatDisplayDate } from '@/shared/lib/date/format-display-date';
import { cn } from '@/shared/lib/utils';
import { ActionsMenu } from '@/shared/ui/acitons-menu';
import { Button } from '@/shared/ui/button';
import { ButtonGroup } from '@/shared/ui/button-group';
import { Card, CardContent } from '@/shared/ui/card';
import { TooltipWrapper } from '@/shared/ui/tooltip-wrapper';
import { Typography } from '@/shared/ui/typography';
import { TaskItemCompleteButton } from '@/widgets/task-list/ui/task-item/task-item-complete-button';
import { Archive, ArrowRight, Bell, Calendar, CalendarX, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { TaskItemProgress } from './task-item-progress';

export interface TaskItemProps {
  item: TaskDTO;
}

export function TaskItem({ item }: TaskItemProps) {
  const { name, project } = item;
  const archiveTask = useArchiveTask({
    onSuccess: () => {
      toast.success('Задача архивирована');
    },
    onError: () => {
      toast.error('Не удалось архивировать задачу');
    },
  });

  const isArchiving = archiveTask.isPending;

  return (
    <Card className={cn('border-none py-3', isArchiving && 'pointer-events-none opacity-50')}>
      <CardContent>
        <div className="flex items-center gap-3">
          <TaskItemCompleteButton item={item} />

          <div className="flex min-w-0 flex-1 items-center gap-3">
            <Typography variant="important" className="truncate">
              {name}
            </Typography>
            <ProjectBadge project={project} />
          </div>

          <TaskItemProgress task={item} />

          <div className="text-muted-foreground flex shrink-0 items-center gap-1 text-xs">
            <TooltipWrapper title="Дата начала">
              <span className="flex items-center gap-1">
                <Calendar className="size-3.5" />
                {formatDisplayDate(item.createdAt)}
              </span>
            </TooltipWrapper>
            {item.due_date && (
              <>
                <ArrowRight className="size-3.5" />
                <TooltipWrapper title="Дедлайн">
                  <span className="flex items-center gap-1">
                    <CalendarX className="size-3.5" />
                    {formatDisplayDate(item.due_date)}
                  </span>
                </TooltipWrapper>
              </>
            )}
          </div>

          <ButtonGroup>
            <StartTaskTimerButton task={item} />
            <TooltipWrapper title="Напомнить">
              <Button className="size-8" size="icon" variant="secondary">
                <Bell className="fill-white" />
              </Button>
            </TooltipWrapper>
            <ActionsMenu
              triggerVariant="secondary"
              actions={[
                {
                  icon: <Archive />,
                  label: 'Архивировать',
                  onClick: () => archiveTask.mutate(item.documentId),
                },
                {
                  icon: <Edit2 />,
                  label: 'Редактировать',
                  onClick: () => {},
                  separator: true,
                },
                {
                  icon: <Trash2 />,
                  label: 'Удалить',
                  onClick: () => {},
                  variant: 'destructive',
                  separator: true,
                },
              ]}
            />
          </ButtonGroup>
        </div>
      </CardContent>
    </Card>
  );
}
