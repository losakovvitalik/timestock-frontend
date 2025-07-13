'use client';

import { useActiveTimeEntry } from '@/entities/time-entry/hooks/use-active-time-entry';
import { useDuration } from '@/shared/hooks/use-duration';
import { PageTitle } from '@/shared/ui/page-title';
import { useEffect } from 'react';

export function formatDurationForTitle(duration: string): string | null {
  if (!duration) return null;

  const [hours, minutes, seconds] = duration.split(':').map(Number);

  if (hours === 0) {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  return duration;
}

export function ActiveTimeEntryTitle() {
  const { data: activeTimeEntry } = useActiveTimeEntry();
  const duration = useDuration(activeTimeEntry?.start_time);

  useEffect(() => {
    console.log(document.querySelectorAll("link[rel~='icon']"));
    const links = document.querySelectorAll("link[rel~='icon']") as NodeListOf<HTMLLinkElement>;

    for (const link of links) {
      if (link) {
        if (activeTimeEntry) {
          link.href = '/icons/active-favicon.ico';
        } else {
          link.href = '/icons/favicon.ico';
        }
      }
    }
  }, [activeTimeEntry]);

  return <PageTitle>{formatDurationForTitle(duration)}</PageTitle>;
}
