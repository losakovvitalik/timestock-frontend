'use client';

import { timeEntryApiHooks } from '@/entities/time-entry/api/time-entry-api-hooks';
import { useDailyTotals } from '@/entities/time-entry/hooks/use-daily-totals';
import { TimeEntry, TimeEntryDTO } from '@/entities/time-entry/model/types';
import { useInView } from '@/shared/hooks/use-in-view';
import { formatDisplayDate } from '@/shared/lib/date/format-display-date';
import { cn } from '@/shared/lib/utils';
import { ApiCollectionResponse, ApiGetParams } from '@/shared/types/api';
import { Badge } from '@/shared/ui/badge';
import { Loader } from '@/shared/ui/loader';
import { Separator } from '@/shared/ui/separator';
import { Typography } from '@/shared/ui/typography';
import { formatDuration } from '@/shared/utils/duration';
import { format, isSameDay } from 'date-fns';
import { Loader2 } from 'lucide-react';
import React, { useMemo } from 'react';
import { SwipeActionsContext } from './model/time-entry-list.context';
import { createTimeEntryListStore } from './model/time-entry-list.store';
import { TimeEntryEmptyState } from './time-entry-empty-state';
import { TimeEntryItem } from './time-entry-item';
import { TimeEntryNotFoundState } from './time-entry-not-found-state';

export interface TimeEntryListProps {
  params?: Omit<ApiGetParams<TimeEntryDTO>, 'populate' | 'pagination'>;
  className?: string;
}

function DayHeader({
  date,
  dailyTotals,
  isDailyTotalsLoading,
}: {
  date: string;
  dailyTotals?: Map<string, number>;
  isDailyTotalsLoading: boolean;
}) {
  const dateKey = format(new Date(date), 'yyyy-MM-dd');
  const totalDuration = dailyTotals?.get(dateKey);

  return (
    <div className="flex items-center gap-2">
      <Badge className="bg-primary/70 text-tiny h-5">{formatDisplayDate(date)}</Badge>
      {totalDuration != null || isDailyTotalsLoading ? (
        <Badge className="bg-primary/70 text-tiny h-5 min-w-12 justify-center">
          {isDailyTotalsLoading ? (
            <Loader2 className="size-3 animate-spin" />
          ) : (
            formatDuration(totalDuration!, 'HH:mm')
          )}
        </Badge>
      ) : null}
      <Separator className="bg-primary/70 h-0.5! flex-1 rounded-lg" />
    </div>
  );
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
      queryKey: timeEntryApiHooks.keys.list(params),
    },
  });

  const flatData = useMemo(
    () => timeEntries?.data?.pages.flatMap((p) => p.data) ?? [],
    [timeEntries?.data?.pages],
  );

  // Диапазон дат из загруженных записей (отсортированы desc → первая = самая новая)
  const dateRange = useMemo(() => {
    if (flatData.length === 0) return null;
    const from = format(new Date(flatData[flatData.length - 1].start_time), 'yyyy-MM-dd');
    const to = format(new Date(flatData[0].start_time), 'yyyy-MM-dd');
    return { from, to };
  }, [flatData]);

  const dailyTotals = useDailyTotals({
    from: dateRange?.from,
    to: dateRange?.to,
    enabled: dateRange !== null,
  });
  const isLoading = timeEntries.isLoading;
  const isEmpty = !params && !isLoading && flatData.length === 0;
  const isNotFound = params && !isLoading && flatData.length === 0;

  const { ref, rootRef } = useInView({
    onInView: () => timeEntries.fetchNextPage(),
  });

  if (isEmpty) {
    return (
      <div className={cn('flex h-full flex-col gap-2', className)}>
        <Typography variant="subtitle">Последние записи</Typography>
        <TimeEntryEmptyState />
      </div>
    );
  }

  if (isNotFound) {
    return (
      <div className={cn('flex h-full flex-col gap-2', className)}>
        <Typography variant="subtitle">Последние записи</Typography>
        <TimeEntryNotFoundState />
      </div>
    );
  }

  return (
    <SwipeActionsContext.Provider value={{ store: swipeStore }}>
      <div className={cn('flex h-full flex-col gap-2 overflow-auto', className)}>
        <Typography variant="subtitle">Последние записи</Typography>
        <ul ref={rootRef} className="z-20 flex h-full flex-col gap-2 overflow-auto pr-1 pb-2">
          {flatData.map((timeEntry, index) => {
            const nextTimeEntry = flatData[index + 1] as TimeEntry | undefined;

            return (
              <React.Fragment key={timeEntry.documentId}>
                {index === 0 && (
                  <DayHeader
                    date={timeEntry.start_time}
                    dailyTotals={dailyTotals.data}
                    isDailyTotalsLoading={dailyTotals.isLoading}
                  />
                )}
                <li>
                  <TimeEntryItem entry={timeEntry} />
                </li>
                {nextTimeEntry && !isSameDay(nextTimeEntry.start_time, timeEntry.start_time) && (
                  <DayHeader
                    date={nextTimeEntry.start_time}
                    dailyTotals={dailyTotals.data}
                    isDailyTotalsLoading={dailyTotals.isLoading}
                  />
                )}
              </React.Fragment>
            );
          })}
          {isLoading && <Loader absolute />}
          <div className="min-h-1" ref={ref} />
          {timeEntries.isFetchingNextPage && <Loader className="my-4" />}
        </ul>
      </div>
    </SwipeActionsContext.Provider>
  );
}
