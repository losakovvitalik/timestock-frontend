import { INTERVAL_OPTIONS } from '@/entities/project-reminder/model/constants';
import { ProjectReminderDTO } from '@/entities/project-reminder/model/types';
import { DeleteProjectReminderDialog } from '@/features/project-reminder/delete/ui/delete-project-reminder-dialog';
import { EditProjectReminderDialog } from '@/features/project-reminder/edit/ui/edit-project-reminder-dialog';
import { useToggleProjectReminder } from '@/features/project-reminder/toggle/hooks/use-toggle-project-reminder';
import { cn } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Label } from '@/shared/ui/label';
import { Switch } from '@/shared/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip';
import { formatDistanceToNowStrict } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Bell, BellOff, Clock, Edit, MoreVertical, Trash2 } from 'lucide-react';
import { useId, useMemo, useState } from 'react';
import { formatReminderDate } from '../../entities/project-reminder/utils/format-reminder-date';

export interface ProjectReminderListItemProps {
  item: ProjectReminderDTO;
  projectId: string;
}

export function ProjectReminderListItem({ item, projectId }: ProjectReminderListItemProps) {
  const id = useId();
  const { toggleReminder, isToggleReminderPending } = useToggleProjectReminder({
    projectId: projectId,
  });

  const intervalLabel = useMemo(
    () =>
      INTERVAL_OPTIONS.find(({ value }) => value === item.recurrence_options.interval)?.label ??
      'Повтор',
    [item.recurrence_options.interval],
  );

  const nextAbs = formatReminderDate(item.next_at);
  const nextRel = useMemo(
    () => formatDistanceToNowStrict(new Date(item.next_at), { addSuffix: true, locale: ru }),
    [item.next_at],
  );

  const handleToggle = () => {
    toggleReminder(item.documentId, !item.enabled);
  };

  const enabled = item.enabled;

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <Card
      data-enabled={enabled}
      className={cn(
        'group relative overflow-hidden py-2 transition-colors',
        'before:bg-primary/60 before:absolute before:top-0 before:left-0 before:h-full before:w-1 before:transition-opacity',
        'data-[enabled=false]:before:bg-muted',
        'data-[enabled=false]:opacity-90',
      )}
    >
      <CardContent>
        <div className="grid grid-cols-[1fr_auto] items-center gap-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="rounded-md">
                {intervalLabel}
              </Badge>
              <span className="text-muted-foreground text-sm">
                в {item.recurrence_options.time}
              </span>
              {enabled ? (
                <Bell className="text-muted-foreground h-4 w-4" aria-hidden />
              ) : (
                <BellOff className="text-muted-foreground h-4 w-4" aria-hidden />
              )}
            </div>

            {item.text ? (
              <p className="text-foreground/90 line-clamp-2">{item.text}</p>
            ) : (
              <p className="text-muted-foreground text-sm italic">Без текста</p>
            )}

            {item.enabled && (
              <div className="text-muted-foreground flex items-center gap-1 text-xs">
                <Clock className="h-3.5 w-3.5" aria-hidden />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <time dateTime={item.next_at} title={nextAbs} className="cursor-default">
                        Следующее: {nextRel}
                      </time>
                    </TooltipTrigger>
                    <TooltipContent>{nextAbs}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <Label htmlFor={`reminder-${id}`} className="sr-only">
                Включить напоминание
              </Label>
              <div className="relative flex items-center">
                <Switch
                  id={`reminder-${id}`}
                  checked={enabled}
                  disabled={isToggleReminderPending}
                  onCheckedChange={handleToggle}
                  aria-busy={isToggleReminderPending}
                />
              </div>
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" onClick={() => setEditOpen(true)}>
                      <Edit />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Редактировать</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <EditProjectReminderDialog
                open={editOpen}
                setOpen={setEditOpen}
                projectReminder={item}
              />

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="destructive" size="icon" onClick={() => setDeleteOpen(true)}>
                      <Trash2 />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Удалить</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <DeleteProjectReminderDialog
              open={deleteOpen}
              setOpen={setDeleteOpen}
              projectReminder={item}
            />

            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost" aria-label="Действия">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem className="gap-2" onSelect={() => setEditOpen(true)}>
                    <Button size="icon">
                      <Edit color="white" />
                    </Button>
                    <span>Редактировать</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2" onSelect={() => setDeleteOpen(true)}>
                    <Button size="icon" variant="destructive">
                      <Trash2 color="white" />
                    </Button>
                    <span>Удалить</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
