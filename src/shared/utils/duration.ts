import { add, differenceInSeconds, intervalToDuration, sub } from 'date-fns';

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

export function formatDuration(
  totalSeconds: number,
  format: 'HH:mm:ss' | 'HH:mm' = 'HH:mm:ss',
): string {
  const duration = intervalToDuration({
    start: 0,
    end: totalSeconds * 1000,
  });

  const pad = (n: number) => String(n).padStart(2, '0');

  const hours = pad((duration.days ?? 0) * 24 + (duration.hours ?? 0));
  const minutes = pad(duration.minutes ?? 0);

  if (format === 'HH:mm') {
    return `${hours}:${minutes}`;
  }

  const seconds = pad(duration.seconds ?? 0);

  return `${hours}:${minutes}:${seconds}`;
}

export function parseDurationString(time: string): {
  hours: number;
  minutes: number;
  seconds: number;
} {
  const [hoursStr, minutesStr, secondsStr] = time.split(':');

  const hours = parseInt(hoursStr, 10) || 0;
  const minutes = parseInt(minutesStr, 10) || 0;
  const seconds = parseInt(secondsStr, 10) || 0;

  return { hours, minutes, seconds };
}

export function durationToSeconds(time: string): number {
  const { hours, minutes, seconds } = parseDurationString(time);

  return hours * 3600 + minutes * 60 + seconds;
}

export function getDuration(
  start: string | number | Date,
  end: string | number | Date = new Date(),
) {
  return differenceInSeconds(end, start);
}
