import { useDuration } from '@/shared/hooks/use-duration';
import { TimeEntryDTO } from '../model/types';

export function TimeEntryDuration({ entry }: { entry?: TimeEntryDTO }) {
  const duration = useDuration(entry?.start_time, entry?.end_time);

  return <span>{duration}</span>;
}
