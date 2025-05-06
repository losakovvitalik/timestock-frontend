import { intervalToDuration } from 'date-fns';

export function formatDuration(from: Date | string, to: Date | string = new Date()): string {
  const duration = intervalToDuration({ start: from, end: to });

  const pad = (num: number) => String(num).padStart(2, '0');

  const hours = pad(duration.hours ?? 0 + (duration.days ?? 0) * 24);
  const minutes = pad(duration.minutes ?? 0);
  const seconds = pad(duration.seconds ?? 0);

  return `${hours}:${minutes}:${seconds}`;
}
