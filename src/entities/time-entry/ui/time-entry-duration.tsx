import { useDuration } from '@/shared/hooks/use-duration';
import { cn } from '@/shared/lib/utils';
import { TimeEntryDTO } from '../model/types';

export interface TimeEntryDurationProps {
  entry: TimeEntryDTO;
  className?: string;
}

export function TimeEntryDuration({ entry, className }: TimeEntryDurationProps) {
  const duration = useDuration(entry?.start_time, entry?.end_time);

  return <span className={cn('tabular-nums', className)}>{duration}</span>;
}
