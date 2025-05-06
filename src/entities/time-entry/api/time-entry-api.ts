import { createApiEndpoint } from '@/shared/api/create-api-endpoint';
import { TimeEntry } from '../model/types';

export const timeEntryApi = createApiEndpoint<TimeEntry>('/time-entries');
