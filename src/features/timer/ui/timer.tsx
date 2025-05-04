'use client';

import { useActiveTimeEntry } from '@/entities/time-entry/hooks/use-active-time-entry';
import { Typography } from '@/shared/ui/typography';
import { useEffect, useState } from 'react';
import { timerFormatDuration } from '../utils/timerFormatDuration';

export function Timer() {
  const activeTimeEntry = useActiveTimeEntry();
  const [duration, setDuration] = useState<string>('');

  useEffect(() => {
    if (!activeTimeEntry.data) {
      return;
    }

    const startDate = new Date(activeTimeEntry.data.start_time);

    const updateDuration = () => {
      setDuration(timerFormatDuration(startDate));
    };

    updateDuration();

    const intervalId = setInterval(updateDuration, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [activeTimeEntry.data?.start_time, activeTimeEntry.data]);

  if (activeTimeEntry.data) {
    return <Typography variant={'subtitle'}>{duration}</Typography>;
  }

  return <Typography variant={'subtitle'}>Старт</Typography>;
}
