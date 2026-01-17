'use client';

import { ProjectBadge } from '@/entities/project/ui/project-badge';
import { useActiveTimeEntry } from '@/entities/time-entry/hooks/use-active-time-entry';
import { TimeEntryDuration } from '@/entities/time-entry/ui/time-entry-duration';
import { TimerDrawer } from '@/features/timer/ui/timer-drawer';
import { TimerToggleButton } from '@/features/timer/ui/timer-toggle-button';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Pencil } from 'lucide-react';

export function AppSidebarActiveTime() {
  const { data: activeTimeEntry } = useActiveTimeEntry();

  if (activeTimeEntry) {
    return (
      <div className="bg-secondary/50 flex flex-col gap-2 rounded-lg p-3">
        <div className="flex items-center justify-between gap-2">
          <TimeEntryDuration className="text-lg font-bold tabular-nums" entry={activeTimeEntry} />
          <div className="flex items-center gap-1.5">
            <TimerDrawer
              trigger={
                <Button size="icon" className="size-6 rounded-full" title="Редактировать">
                  <Pencil className="size-3" />
                </Button>
              }
            />
            <TimerToggleButton className="size-6 [&>div]:size-2.5 [&>svg]:size-3" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {activeTimeEntry.project ? (
            <ProjectBadge project={activeTimeEntry.project} />
          ) : (
            <span className="text-muted-foreground text-xs">Проект не указан</span>
          )}
          <p
            className={cn('text-muted-foreground line-clamp-2 text-xs', {
              italic: !activeTimeEntry.description,
            })}
          >
            {activeTimeEntry.description || 'Без описания'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-secondary/30 flex items-center justify-between gap-2 rounded-lg p-3">
      <span className="text-muted-foreground text-sm">Таймер не запущен</span>
      <TimerToggleButton className="size-8 [&>svg]:size-4" />
    </div>
  );
}
