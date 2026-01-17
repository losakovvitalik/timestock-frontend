'use client';

import { ProjectBadge } from '@/entities/project/ui/project-badge';
import { useActiveTimeEntry } from '@/entities/time-entry/hooks/use-active-time-entry';
import { TimeEntryDuration } from '@/entities/time-entry/ui/time-entry-duration';
import { cn } from '@/shared/lib/utils';
import { Typography } from '@/shared/ui/typography';

export function Timer() {
  const { data: activeTimeEntry } = useActiveTimeEntry();

  if (activeTimeEntry) {
    return (
      <div className="flex items-center gap-2 sm:gap-3">
        <TimeEntryDuration className="text-base font-bold sm:text-lg" entry={activeTimeEntry} />
        <ProjectBadge project={activeTimeEntry.project} />
        <Typography
          className={cn('text-muted-foreground line-clamp-1 hidden flex-1 text-sm sm:block', {
            italic: !activeTimeEntry.description,
          })}
        >
          {activeTimeEntry.description || 'Без описания'}
        </Typography>
      </div>
    );
  }

  return (
    <Typography className="text-muted-foreground" size="sm">
      Таймер не запущен
    </Typography>
  );
}
