import { createApiHooks } from '@/shared/lib/react-query/create-api-hooks';
import { TimeEntry, TimeEntryPayload } from '../model/types';

export const timeEntryApiHooks = createApiHooks<TimeEntry, TimeEntryPayload>(
  'timeEntry',
  '/time-entries',
);
