'use client';

import { useActiveTimeEntry } from '@/entities/time-entry/hooks/use-active-time-entry';
import { TimeEntryDuration } from '@/entities/time-entry/ui/time-entry-duration';
import { TimerToggleButton } from '@/features/timer/ui/timer-toggle-button';

export function AppSidebarActiveTime() {
  const { data: activeTimeEntry } = useActiveTimeEntry();

  return (
    <div className="border-border flex justify-between gap-2 rounded-lg border p-2 text-xs">
      {activeTimeEntry ? (
        <>
          <span className="flex-1 truncate">
            {activeTimeEntry?.description ? activeTimeEntry?.description : 'Без описания'}
          </span>
          <TimeEntryDuration entry={activeTimeEntry} />
        </>
      ) : (
        <span>Запустить таймер</span>
      )}

      <TimerToggleButton className="size-4 !p-0.5 [&>svg]:size-2" />
    </div>
  );
}
