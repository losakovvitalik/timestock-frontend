import { $api } from '@/shared/lib/api';
import { TimeEntry } from '../model/types';

export interface TimeEntryUpdatePayload {
  name?: string;
  project?: string;
  start_time?: string | Date;
  end_time?: string | Date;
}

export interface TimeEntryUpdateResponse {
  data: TimeEntry;
}

export const timeEntryUpdate = async (documentId: string, data: TimeEntryUpdatePayload) => {
  const res = await $api.put<TimeEntryUpdateResponse>(`/time-entries/${documentId}`, { data });
  return res.data;
};
