import { useEffect, useState } from 'react';
import { formatDurationInterval } from '../utils/format-duration';

type TimeUnion = Date | string | null | undefined;

export function useDuration(startTime?: TimeUnion, endTime?: TimeUnion): string {
  const [duration, setDuration] = useState('');

  useEffect(() => {
    if (!startTime) return;

    const start = new Date(startTime);
    const end = endTime ? new Date(endTime) : null;

    if (end) {
      // Статическая продолжительность
      setDuration(formatDurationInterval(start, end));
      return;
    }

    // Динамическое обновление
    const updateDuration = () => {
      setDuration(formatDurationInterval(start, new Date()));
    };

    updateDuration();
    const intervalId = setInterval(updateDuration, 1000);

    return () => clearInterval(intervalId);
  }, [startTime, endTime]);

  return duration;
}
