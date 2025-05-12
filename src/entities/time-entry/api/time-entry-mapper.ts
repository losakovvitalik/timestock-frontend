import { formatDuration } from '@/shared/utils/format-duration';
import { TimeEntryDTO } from '../model/types';

export interface TimeEntry extends TimeEntryDTO {
  duration: string; // длительность в формате HH:mm:ss
}

export function adaptTimeEntryDto(dto: TimeEntryDTO): TimeEntry {
  return {
    ...dto,
    duration: formatDuration(dto.start_time, dto.end_time || undefined),
  };
}
