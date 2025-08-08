'use client';

import { useGetDailyAggregateByProject } from '@/entities/daily-aggregate/hooks/use-get-daily-aggregate-by-project';
import { formatDisplayDate } from '@/shared/lib/date/format-display-date';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/shared/ui/chart';
import { Loader } from '@/shared/ui/loader';
import { formatDuration } from '@/shared/utils/duration';
import { format, subDays } from 'date-fns';
import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { viewProjectBuildTicks } from '../utils/view-project-build-ticks';

const chartConfig = {
  duration: { label: 'Часы', color: 'var(--chart-1)' },
} satisfies ChartConfig;

export interface ViewProjectChartProps {
  projectId: string;
}

export function ViewProjectChart({ projectId }: ViewProjectChartProps) {
  const { data, isLoading } = useGetDailyAggregateByProject({
    projectId,
    from: format(subDays(new Date(), 6), 'yyyy-MM-dd'),
    to: format(new Date(), 'yyyy-MM-dd'),
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

  const ticks = useMemo(() => viewProjectBuildTicks(maxDuration, 5), [maxDuration]);
  const topDomain = ticks[ticks.length - 1];

  if (isLoading) return <Loader absolute />;

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Потраченное время</CardTitle>
        <CardDescription>
          {formatDisplayDate(subDays(new Date(), 6))} - {formatDisplayDate(new Date())}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[400px] w-full" config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <YAxis
              dataKey="duration"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
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
