'use client';

import { useActiveTimeEntry } from '@/entities/time-entry/hooks/use-active-time-entry';
import { useDuration } from '@/shared/hooks/use-duration';
import { Typography } from '@/shared/ui/typography';

export function Timer() {
  const activeTimeEntry = useActiveTimeEntry();
  const duration = useDuration(activeTimeEntry.data?.start_time);

  if (activeTimeEntry.data) {
    return <Typography variant={'subtitle'}>{duration}</Typography>;
  }

  return <Typography variant={'subtitle'}>Старт</Typography>;
}
