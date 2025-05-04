import { $api } from '@/shared/lib/api';
import { ApiCollectionResponse } from '@/shared/types/api';
import { TimeEntry } from '../model/types';

export interface TimeEntryGetActivePayload {
  user: number;
}

export interface TimeEntryGetActiveResponse extends ApiCollectionResponse<TimeEntry | null> {}

export const timeEntryGetActive = async ({ user }: TimeEntryGetActivePayload) => {
  const res = await $api.get<TimeEntryGetActiveResponse>('/time-entries', {
    params: {
      filters: {
        user,
        end_time: {
          $null: true,
        },
      },
    },
  });

  return res.data.data[0] || null;
};
