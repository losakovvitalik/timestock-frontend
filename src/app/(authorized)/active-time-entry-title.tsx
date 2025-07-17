'use client';

import { useActiveTimeEntry } from '@/entities/time-entry/hooks/use-active-time-entry';
import { useDuration } from '@/shared/hooks/use-duration';
import useLayoutStore from '@/shared/stores/use-layout-store';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function formatDurationForTitle(duration: string): string | null {
  if (!duration) return null;

  const [hours, minutes, seconds] = duration.split(':').map(Number);

  if (hours === 0) {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  return duration;
}

let lastFavicon: HTMLLinkElement | null = null;

function updateFavicon(href: string) {
  requestAnimationFrame(() => {
    const head = document.head;
    if (!head) return;

    if (lastFavicon && lastFavicon.parentNode) {
      lastFavicon.parentNode.removeChild(lastFavicon);
    }

    const newLink = document.createElement('link');
    newLink.rel = 'icon';
    newLink.href = href;
    head.appendChild(newLink);
    lastFavicon = newLink;
  });
}

export function ActiveTimeEntryTitle() {
  const pathname = usePathname();
  const { data: activeTimeEntry } = useActiveTimeEntry();
  const duration = useDuration(activeTimeEntry?.start_time);
  const { setTitle, title } = useLayoutStore();

  useEffect(() => {
    if (!title) {
      setTitle(document.title);
    }
  }, [title, setTitle]);

  useEffect(() => {
    if (activeTimeEntry) {
      document.title = String(formatDurationForTitle(duration));
    } else if (title && typeof title === 'string') {
      document.title = title;
    }
  }, [title, duration, activeTimeEntry]);

  useEffect(() => {
    if (activeTimeEntry) {
      updateFavicon('/icons/active-favicon.ico');
    } else {
      updateFavicon('/icons/favicon.ico');
    }
  }, [activeTimeEntry, pathname]);

  return null;
}
