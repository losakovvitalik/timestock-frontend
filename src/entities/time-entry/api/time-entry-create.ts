import { $api } from '@/shared/lib/api';
import { TimeEntry } from '../model/types';

export interface TimeEntryCreatePayload {
  name?: string;
  project?: string;
  start_time?: string | Date;
  end_time?: string | Date;
}

export interface TimeEntryCreateResponse {
  data: TimeEntry;
}

export const timeEntryCreate = async (data: TimeEntryCreatePayload) => {
  const res = await $api.post<TimeEntryCreateResponse>('/time-entries', { data });
  return res.data;
};
