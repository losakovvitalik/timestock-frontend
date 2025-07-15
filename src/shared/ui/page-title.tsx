'use client';

import { formatDurationForTitle } from '@/app/(authorized)/active-time-entry-title';
import { useActiveTimeEntry } from '@/entities/time-entry/hooks/use-active-time-entry';
import { PropsWithChildren, useEffect } from 'react';
import { useDuration } from '../hooks/use-duration';
import { usePageTitle } from '../hooks/use-page-title';

export function PageTitle({ children }: PropsWithChildren) {
  const { data: activeTimeEntry } = useActiveTimeEntry();
  const duration = useDuration(activeTimeEntry?.start_time);

  usePageTitle(children);

  useEffect(() => {
    if (activeTimeEntry) {
      document.title = String(formatDurationForTitle(duration));
    } else if (children && typeof children === 'string') {
      document.title = children;
    }
  }, [children, duration, activeTimeEntry]);

  return null;
}
