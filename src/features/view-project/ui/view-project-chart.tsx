'use client';

import { useGetDailyAggregateByProject } from '@/entities/daily-aggregate/hooks/use-get-daily-aggregate-by-project';
import { formatDisplayDate } from '@/shared/lib/date/format-display-date';
import { pluralize } from '@/shared/lib/pluralize';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Calendar } from '@/shared/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/shared/ui/chart';
import { Loader } from '@/shared/ui/loader';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { formatDuration } from '@/shared/utils/duration';
import { format, subDays } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { type DateRange } from 'react-day-picker';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { viewProjectBuildTicks } from '../utils/view-project-build-ticks';

const chartConfig = {
  duration: { label: 'Часы', color: 'var(--chart-1)' },
} satisfies ChartConfig;

export interface ViewProjectChartProps {
  projectId: string;
}

export function ViewProjectChart({ projectId }: ViewProjectChartProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 6),
    to: new Date(),
  });
  const [tempDateRange, setTempDateRange] = useState<DateRange | undefined>(dateRange);

  const handleApply = () => {
    setDateRange(tempDateRange);
    setIsCalendarOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setTempDateRange(dateRange);
    } else {
      setDateRange(tempDateRange);
    }
    setIsCalendarOpen(open);
  };

  const { data, isLoading } = useGetDailyAggregateByProject({
    projectId,
    from: dateRange?.from
      ? format(dateRange.from, 'yyyy-MM-dd')
      : format(subDays(new Date(), 6), 'yyyy-MM-dd'),
    to: dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
  });

  const chartData = useMemo(
    () =>
      data?.data.map((val) => ({
        date: val.date,
        duration: val.duration,
      })) ?? [],
    [data],
  );

  const maxDuration = useMemo(
    () => (chartData.length ? Math.max(...chartData.map((d) => d.duration)) : 0),
    [chartData],
  );

  const { totalDuration, tracksCount } = useMemo(
    () => ({
      totalDuration: chartData.reduce((acc, d) => acc + (d.duration || 0), 0),
      tracksCount: data?.data.reduce((acc, d) => acc + (d.tracks_count || 0), 0) ?? 0,
    }),
    [chartData, data],
  );

  const ticks = useMemo(() => viewProjectBuildTicks(maxDuration, 5), [maxDuration]);
  const topDomain = ticks[ticks.length - 1];

  if (isLoading) return <Loader absolute />;

  return (
    <Card className="mt-4">
      <CardHeader>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>Потраченное время</CardTitle>
            <div className="flex gap-2">
              <Badge variant="secondary">
                {tracksCount}{' '}
                {pluralize({ count: tracksCount, one: 'запись', few: 'записи', many: 'записей' })}
              </Badge>
              <Badge variant="secondary">{formatDuration(totalDuration)}</Badge>
            </div>
          </div>
          <Popover open={isCalendarOpen} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="text-muted-foreground flex-1 text-sm sm:flex-none"
              >
                <CalendarIcon className="size-3" />
                {dateRange?.from ? formatDisplayDate(dateRange.from) : '—'} -{' '}
                {dateRange?.to ? formatDisplayDate(dateRange.to) : '—'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                defaultMonth={tempDateRange?.from}
                selected={tempDateRange}
                onSelect={setTempDateRange}
                numberOfMonths={2}
                showOutsideDays={false}
              />
              <div className="border-t p-3">
                <Button onClick={handleApply} className="w-full">
                  Применить
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[400px] w-full" config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <YAxis
              dataKey="duration"
              tickLine={false}
              axisLine={false}
              tickSize={30}
              domain={[0, topDomain]} // гарантируем верхнюю границу по последнему тику
              ticks={ticks} // «красивые» тики кратные 15 минутам
              allowDecimals={false}
              tickFormatter={(v) => formatDuration(v).slice(0, 5)}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => formatDisplayDate(new Date(value))}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(label) => formatDisplayDate(new Date(label))}
                  formatter={(value) => formatDuration(Number(value))}
                />
              }
            />
            <Bar dataKey="duration" fill="var(--color-duration)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
