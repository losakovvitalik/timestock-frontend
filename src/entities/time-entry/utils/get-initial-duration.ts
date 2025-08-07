import { formatDuration } from '@/shared/utils/duration';
import { differenceInSeconds } from 'date-fns';
import { TimeEntryDTO } from '../model/types';

export function getInitialDuration(values: Partial<TimeEntryDTO>): string | undefined {
  if (values.duration) return formatDuration(values.duration);

  if (values.start_time) {
    return formatDuration(differenceInSeconds(new Date(), new Date(values.start_time)));
  }

  return undefined;
}
