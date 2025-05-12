import { createApiEndpoint } from '@/shared/api/create-api-endpoint';
import { TimeEntryDTO, TimeEntryPayload } from '../model/types';

export const timeEntryApi = createApiEndpoint<TimeEntryDTO, TimeEntryPayload>('/time-entries');
