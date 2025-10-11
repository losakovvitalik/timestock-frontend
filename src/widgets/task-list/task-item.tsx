import { ProjectBadge } from '@/entities/project/ui/project-badge';
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
import { TaskItemCompleteButton } from '@/widgets/task-list/task-item-complete-button';
import { Archive, Bell, Calendar1, CalendarX, Edit2, Trash2 } from 'lucide-react';
import { TaskItemProgress } from './task-item-progress';

export interface TaskItemProps {
  item: TaskDTO;
}

export function TaskItem({ item }: TaskItemProps) {
  const { name, project } = item;

  return (
    <Card className={cn('border-none py-5')}>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="flex flex-1 items-center gap-2">
            <TaskItemCompleteButton item={item} />
            <div className="flex items-center gap-3">
              <Typography variant="important">{name}</Typography>
              <ProjectBadge project={project} />
            </div>
          </div>
          <TaskItemProgress task={item} />

          <div className="flex gap-4">
            {/* <div className="w-max text-sm">
              {formatDisplayDate(item.createdAt)}{' '}
              {item.due_date ? `- ${formatDisplayDate(item.due_date)}` : null}
            </div> */}
            <div className="flex w-max flex-col gap-1 text-sm">
              <div className="flex items-center gap-1" title="Дата начала">
                <Calendar1 className="size-3.5" />
                {formatDisplayDate(item.createdAt)}
              </div>
              {item.due_date && (
                <div className="flex items-center gap-1" title="Дедлайн">
                  <CalendarX className="size-3.5" />
                  {formatDisplayDate(item.due_date)}
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="flex gap-2">
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
                      onClick: () => {},
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

              {/*<TooltipButton title="Архивировать">*/}
              {/*  <Button className="size-8" size="icon" variant="secondary">*/}
              {/*    <Archive />*/}
              {/*  </Button>*/}
              {/*</TooltipButton>*/}

              {/*<TooltipButton title="Редактировать">*/}
              {/*  <Button className="size-8" size="icon" variant="secondary">*/}
              {/*    <Edit2 className="fill-white" />*/}
              {/*  </Button>*/}
              {/*</TooltipButton>*/}

              {/*<TooltipButton title="Удалить">*/}
              {/*  <Button className="size-8" size="icon" variant="default">*/}
              {/*    <Trash2 />*/}
              {/*  </Button>*/}
              {/*</TooltipButton>*/}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
