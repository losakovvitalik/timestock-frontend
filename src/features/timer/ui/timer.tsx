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
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <TimeEntryDuration className="font-bold" entry={activeTimeEntry} />
          <ProjectBadge project={activeTimeEntry.project} />
        </div>
        <Typography
          className={cn('line-clamp-1 text-sm', {
            'italic opacity-50': !activeTimeEntry.description,
          })}
        >
          {activeTimeEntry.description || 'Без описания'}
        </Typography>
      </div>
    );
  }

  return <Typography variant="subtitle">Таймер не запущен</Typography>;
}
