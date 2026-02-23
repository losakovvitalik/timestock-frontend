import { ProjectBadge } from '@/entities/project/ui/project-badge';
import { useArchiveTask } from '@/entities/task/hooks/use-archive-task';
import { TaskDTO } from '@/entities/task/model/task-types';
import { StartTaskTimerButton } from '@/features/task/start-task-timer/ui/start-task-timer-button';
import { useTaskImportance } from '@/features/task/task-importance/hooks/use-task-importance';
import { formatDisplayDate } from '@/shared/lib/date/format-display-date';
import { cn } from '@/shared/lib/utils';
import { Action, ActionsMenu } from '@/shared/ui/acitons-menu';
import { Button } from '@/shared/ui/button';
import { ButtonGroup } from '@/shared/ui/button-group';
import { Card, CardContent } from '@/shared/ui/card';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/shared/ui/context-menu';
import { TooltipWrapper } from '@/shared/ui/tooltip-wrapper';
import { Typography } from '@/shared/ui/typography';
import { TaskItemCompleteButton } from '@/widgets/task-list/ui/task-item/task-item-complete-button';
import { Archive, ArrowRight, Bell, Calendar, CalendarX, Flag, Pencil, Trash2 } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { TaskItemProgress } from './task-item-progress';

export interface TaskItemProps {
  item: TaskDTO;
}

export function TaskItem({ item }: TaskItemProps) {
  const { name, project, is_important } = item;
  const { toggleImportance } = useTaskImportance({ taskId: item.documentId });
  const archiveTask = useArchiveTask({
    onSuccess: () => {
      toast.success('Задача архивирована');
    },
    onError: () => {
      toast.error('Не удалось архивировать задачу');
    },
  });

  const isArchiving = archiveTask.isPending;

  const actions: Action[] = [
    {
      icon: is_important ? <Flag className="fill-yellow-300/80 stroke-yellow-300/80" /> : <Flag />,
      label: 'В приоритет',
      onClick: () => toggleImportance(is_important),
    },
    {
      icon: <Pencil />,
      label: 'Редактировать',
      onClick: () => {},
    },
    {
      icon: <Archive />,
      label: 'Архивировать',
      onClick: () => archiveTask.mutate(item.documentId),
    },
    {
      icon: <Trash2 />,
      label: 'Удалить',
      onClick: () => {},
      variant: 'destructive',
      separator: true,
    },
  ];

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card
          className={cn(
            'py-3',
            is_important ? 'border-primary/40 border-2 py-2.5' : 'border-none',
            isArchiving && 'pointer-events-none opacity-50',
          )}
        >
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

              {is_important && (
                <div>
                  <Flag className="size-3.5 fill-yellow-300/80 stroke-yellow-300/80" />
                </div>
              )}

              <ButtonGroup>
                <StartTaskTimerButton task={item} />
                <TooltipWrapper title="Напомнить">
                  <Button className="size-8" size="icon" variant="secondary">
                    <Bell className="fill-white" />
                  </Button>
                </TooltipWrapper>
                <ActionsMenu triggerVariant="secondary" actions={actions} />
              </ButtonGroup>
            </div>
          </CardContent>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        {actions.map((action, index) => (
          <React.Fragment key={index}>
            {action.separator && <ContextMenuSeparator />}
            <ContextMenuItem
              onSelect={action.onClick}
              className={cn(
                action.variant === 'destructive' &&
                  'text-destructive [&_svg]:stroke-destructive hover:[&_svg]:stroke-white',
              )}
            >
              {action.icon && (
                <span className="[&>svg]:size-3.5 [&>svg]:duration-100">{action.icon}</span>
              )}
              {action.label}
            </ContextMenuItem>
          </React.Fragment>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
}
