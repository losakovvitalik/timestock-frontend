'use client';

import { useActiveTimeEntry } from '@/entities/time-entry/hooks/use-active-time-entry';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Pause, Play } from 'lucide-react';
import { useStartTimer } from '../hooks/use-start-timer';
import { useStopTimer } from '../hooks/use-stop-timer';

export interface TimerToggleButtonProps {
  className?: string;
}

export function TimerToggleButton({ className }: TimerToggleButtonProps) {
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
    <Button
      className={cn('size-24 rounded-full', className)}
      disabled={isPending}
      onClick={handleClick}
    >
      {activeTimeEntry ? (
        <Pause className="size-8/12 fill-white stroke-white" />
      ) : (
        <Play className="size-8/12 fill-white stroke-white" />
      )}
    </Button>
  );
}
