'use client';

import { timeEntryApiHooks } from '@/entities/time-entry/api/time-entry-api-hooks';
import { TimeEntry } from '@/entities/time-entry/model/types';
import { TimeEntryItem } from '@/entities/time-entry/ui/time-entry-item';
import { ApiGetParams } from '@/shared/types/api';

export interface TimeEntryListProps {
  params?: ApiGetParams<TimeEntry>;
}

export function TimeEntryList({ params }: TimeEntryListProps) {
  const timeEntries = timeEntryApiHooks.useList({
    filters: {
      ...params?.filters,
      end_time: params?.filters?.end_time || {
        $notNull: true,
      },
    },
    populate: {
      ...params?.populate,
      project: params?.populate?.project ? params?.populate?.project : true,
    },
    sort: params?.sort || {
      start_time: 'desc',
    },
  });

  return (
    <ul className="flex flex-col gap-2">
      {timeEntries.data?.data.map((timeEntry) => (
        <li key={timeEntry.documentId}>
          <TimeEntryItem entry={timeEntry} />
        </li>
      ))}
    </ul>
  );
}
