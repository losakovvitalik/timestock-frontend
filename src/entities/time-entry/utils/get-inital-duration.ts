import { formatDuration } from '@/shared/utils/duration';
import { TimeEntryDTO } from '../model/types';

export function getInitialDuration(values: Partial<TimeEntryDTO>): string | undefined {
  if (values.duration) return formatDuration(values.duration);
  if (values.start_time) {
    return formatDuration(Date.now() - new Date(values.start_time).getTime());
  }
  return undefined;
}
