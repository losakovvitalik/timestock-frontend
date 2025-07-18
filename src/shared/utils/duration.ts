import { add, intervalToDuration, sub } from 'date-fns';

export function addDurationToDate(date: Date | string, duration: string): Date {
  const [hours, minutes, seconds] = duration.match(/.{1,2}/g)!.map(Number);

  return add(date, {
    hours,
    minutes,
    seconds,
  });
}

export function subtractDurationFromDate(date: Date | string, duration: string): Date {
  const [hours, minutes, seconds] = duration.match(/.{1,2}/g)!.map(Number);

  return sub(date, {
    hours,
    minutes,
    seconds,
  });
}

export function formatDuration(totalSeconds: number): string {
  const duration = intervalToDuration({
    start: 0,
    end: totalSeconds * 1000,
  });

  const pad = (n: number) => String(n).padStart(2, '0');

  const hours = pad((duration.days ?? 0) * 24 + (duration.hours ?? 0));
  const minutes = pad(duration.minutes ?? 0);
  const seconds = pad(duration.seconds ?? 0);

  return `${hours}:${minutes}:${seconds}`;
}
