'use client';

import { useActiveTimeEntry } from '@/entities/time-entry/hooks/use-active-time-entry';
import { Button } from '@/shared/ui/button';
import { Pause, Play } from 'lucide-react';
import { useStartTimer } from '../hooks/use-start-timer';
import { useStopTimer } from '../hooks/use-stop-timer';

export function TimerToggleButton() {
  const startTimer = useStartTimer();
  const stopTimer = useStopTimer();
  const { data: activeTimeEntry } = useActiveTimeEntry();

  const handleClick = () => {
    if (activeTimeEntry) {
      stopTimer.mutate();
    } else {
      startTimer.mutate({});
    }
  };

  const isPending = startTimer.isPending || stopTimer.isPending;

  return (
    <div>
      <Button className="size-24 rounded-full" disabled={isPending} onClick={handleClick}>
        {activeTimeEntry ? (
          <Pause className="size-12 fill-white stroke-white" />
        ) : (
          <Play className="size-12 fill-white stroke-white" />
        )}
      </Button>
    </div>
  );
}
