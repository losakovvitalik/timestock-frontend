import { add, sub } from 'date-fns';

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
