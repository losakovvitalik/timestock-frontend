'use client';

import { timeEntryApiHooks } from '@/entities/time-entry/api/time-entry-api-hooks';
import { TimeEntry, TimeEntryDTO } from '@/entities/time-entry/model/types';
import { useInView } from '@/shared/hooks/use-in-view';
import { formatDisplayDate } from '@/shared/lib/date/format-display-date';
import { cn } from '@/shared/lib/utils';
import { ApiCollectionResponse, ApiGetParams } from '@/shared/types/api';
import { Badge } from '@/shared/ui/badge';
import { Loader } from '@/shared/ui/loader';
import { Separator } from '@/shared/ui/separator';
import { Typography } from '@/shared/ui/typography';
import { isSameDay } from 'date-fns';
import React, { useMemo } from 'react';
import { SwipeActionsContext } from './model/time-entry-list.context';
import { createTimeEntryListStore } from './model/time-entry-list.store';
import { TimeEntryItem } from './time-entry-item';

export interface TimeEntryListProps {
  params?: Omit<ApiGetParams<TimeEntryDTO>, 'populate' | 'pagination'>;
  className?: string;
}

export function TimeEntryList({ params, className }: TimeEntryListProps) {
  const swipeStore = useMemo(() => createTimeEntryListStore(), []);

  const timeEntries = timeEntryApiHooks.useInfinityList<ApiCollectionResponse<TimeEntry>>({
    params: {
      filters: {
        ...params?.filters,
        end_time: params?.filters?.end_time || {
          $notNull: true,
        },
      },
      populate: {
        project: {
          populate: {
            color: true,
          },
        },
      },
      sort: params?.sort || {
        start_time: 'desc',
      },
    },
    options: {
      queryKey: timeEntryApiHooks.keys.lists(),
    },
  });

  const flatData = timeEntries?.data?.pages.flatMap((p) => p.data) ?? [];

  const { ref, rootRef } = useInView({
    onInView: () => timeEntries.fetchNextPage(),
  });

  return (
    <SwipeActionsContext.Provider value={{ store: swipeStore }}>
      <div className={cn('flex h-full flex-col gap-2 overflow-auto', className)}>
        <Typography variant="subtitle">Последнии записи</Typography>
        <ul ref={rootRef} className="z-20 flex h-full flex-col gap-2 overflow-auto pr-1 pb-2">
          {flatData ? (
            flatData.map((timeEntry, index) => {
              const nextTimeEntry = flatData[index + 1] as TimeEntry | undefined;

              return (
                <React.Fragment key={timeEntry.documentId}>
                  {index === 0 && (
                    <div className="grid grid-cols-[auto_1fr] items-center gap-2">
                      <Badge className="bg-primary/70 text-[10px]">
                        {formatDisplayDate(timeEntry.start_time)}
                      </Badge>
                      <Separator className="bg-primary/70 !h-0.5 rounded-lg" />
                    </div>
                  )}
                  <li>
                    <TimeEntryItem entry={timeEntry} />
                  </li>
                  {nextTimeEntry && !isSameDay(nextTimeEntry.start_time, timeEntry.start_time) && (
                    <div className="grid grid-cols-[auto_1fr] items-center gap-2">
                      <Badge className="bg-primary/70 text-[10px]">
                        {formatDisplayDate(nextTimeEntry.start_time)}
                      </Badge>
                      <Separator className="bg-primary/70 !h-0.5 rounded-lg" />
                    </div>
                  )}
                </React.Fragment>
              );
            })
          ) : (
            <Loader absolute />
          )}
          <div className="min-h-1" ref={ref} />
          {timeEntries.isFetchingNextPage && <Loader className="my-4" />}
        </ul>
      </div>
    </SwipeActionsContext.Provider>
  );
}
