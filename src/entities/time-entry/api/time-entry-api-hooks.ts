import { createApiHooks } from '@/shared/lib/react-query/create-api-hooks';
import { TimeEntryDTO, TimeEntryPayload } from '../model/types';

export const timeEntryApiHooks = createApiHooks<TimeEntryDTO, TimeEntryPayload>(
  'timeEntry',
  '/time-entries',
);
