import { useEffect, useState } from 'react';
import { formatDuration } from '../utils/format-duration';

export function useDuration(startTime?: Date | string | null | undefined): string {
  const [duration, setDuration] = useState('');

  useEffect(() => {
    if (!startTime) {
      return;
    }

    const updateDuration = () => {
      setDuration(formatDuration(new Date(startTime)));
    };

    updateDuration(); // обновим сразу при маунте
    const intervalId = setInterval(updateDuration, 1000);

    return () => clearInterval(intervalId);
  }, [startTime]); // следим за изменением времени старта

  return duration;
}
