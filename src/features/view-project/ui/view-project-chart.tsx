'use client';

import { useGetDailyAggregateByProject } from '@/entities/daily-aggregate/hooks/use-get-daily-aggregate-by-project';
import { formatDisplayDate } from '@/shared/lib/date/format-display-date';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/shared/ui/chart';
import { DateRangePicker } from '@/shared/ui/date-range-picker';
import { Loader } from '@/shared/ui/loader';
import { formatDuration } from '@/shared/utils/duration';
import { format, subDays } from 'date-fns';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

const chartConfig = {
  duration: {
    label: 'Часы',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

export interface ViewProjectChartProps {
  projectId: string;
  createdAt: string;
}

export function ViewProjectChart({ projectId, createdAt }: ViewProjectChartProps) {
  const [range, setRange] = useState<DateRange>({
    from: subDays(new Date(), 6),
    to: new Date(),
  });

  const { data, isLoading } = useGetDailyAggregateByProject(
    {
      projectId,
      from: format(range.from!, 'yyyy-MM-dd'),
      to: format(range.to!, 'yyyy-MM-dd'),
    },
    { enabled: Boolean(range.from && range.to) },
  );

  const chartData = data?.data.map((val) => ({
    date: val.date,
    duration: val.duration,
  }));

  if (isLoading) {
    return <Loader absolute />;
  }

  return (
    <Card className="mt-4">
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col">
          <CardTitle>Потраченное время</CardTitle>
          <CardDescription>
            {formatDisplayDate(range.from!)} - {formatDisplayDate(range.to!)}
          </CardDescription>
        </div>
        <div className="w-full sm:w-auto">
          <DateRangePicker
            value={range}
            onChange={setRange}
            min={new Date(createdAt)}
            max={new Date()}
          />
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[400px] w-full" config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
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
                  formatter={(value) => {
                    return formatDuration(Number(value));
                  }}
                />
              }
            />
            <Bar dataKey="duration" fill="var(--color-duration)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}
