'use client';

import { timeEntryApiHooks } from '@/entities/time-entry/api/time-entry-api-hooks';
import { TimeEntryDTO } from '@/entities/time-entry/model/types';
import { cn } from '@/shared/lib/utils';
import { ApiGetParams } from '@/shared/types/api';
import { Typography } from '@/shared/ui/typography';
import { TimeEntryItem } from './time-entry-item';

export interface TimeEntryListProps {
  params?: ApiGetParams<TimeEntryDTO>;
  className?: string;
}

export function TimeEntryList({ params, className }: TimeEntryListProps) {
  const timeEntries = timeEntryApiHooks.useList({
    filters: {
      ...params?.filters,
      end_time: params?.filters?.end_time || {
        $notNull: true,
      },
    },
    populate: {
      ...params?.populate,
      project: params?.populate?.project
        ? params?.populate?.project
        : {
            populate: {
              color: true,
            },
          },
    },
    sort: params?.sort || {
      start_time: 'desc',
    },
  });

  return (
    <div className={cn('flex h-full flex-col gap-2 overflow-auto', className)}>
      <Typography variant={'subtitle'}>Последнии записи</Typography>
      <ul className="flex h-full flex-col gap-2 overflow-auto pb-2">
        {timeEntries.data?.data.map((timeEntry) => (
          <li key={timeEntry.documentId}>
            <TimeEntryItem entry={timeEntry} />
          </li>
        ))}
      </ul>
    </div>
  );
}
