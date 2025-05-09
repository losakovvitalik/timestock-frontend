import { createApiEndpoint } from '@/shared/api/create-api-endpoint';
import { TimeEntry, TimeEntryPayload } from '../model/types';

export const timeEntryApi = createApiEndpoint<TimeEntry, TimeEntryPayload>('/time-entries');
