import { createApiHooks } from '@/shared/lib/react-query/create-api-hooks';
import { TimeEntryDTO, TimeEntryPayload } from '../model/types';
import { adaptTimeEntryDto, TimeEntry } from './time-entry-mapper';

export const timeEntryApiHooks = createApiHooks<TimeEntryDTO, TimeEntryPayload, TimeEntry>(
  'timeEntry',
  '/time-entries',
  adaptTimeEntryDto,
);
