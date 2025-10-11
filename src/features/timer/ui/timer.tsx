'use client';

import { useActiveTimeEntry } from '@/entities/time-entry/hooks/use-active-time-entry';
import { TimeEntryDuration } from '@/entities/time-entry/ui/time-entry-duration';
import { cn } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';
import { Typography } from '@/shared/ui/typography';

export function Timer() {
  const { data: activeTimeEntry } = useActiveTimeEntry();

  if (activeTimeEntry) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <TimeEntryDuration className="font-bold" entry={activeTimeEntry} />
          {activeTimeEntry.project && (
            <Badge className="" style={{ background: activeTimeEntry.project.color.hex + '80' }}>
              {activeTimeEntry.project.name}
            </Badge>
          )}
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
