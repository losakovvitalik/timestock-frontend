'use client';

import { useGetDailyAggregateByProject } from '@/entities/daily-aggregate/hooks/use-get-daily-aggregate-by-project';
import { formatDisplayDate } from '@/shared/lib/date/format-display-date';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/shared/ui/chart';
import { Loader } from '@/shared/ui/loader';
import { formatDuration } from '@/shared/utils/duration';
import { format, subDays } from 'date-fns';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

const chartConfig = {
  duration: {
    label: 'Часы',
    color: 'var(--chart-1)',
  },
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

  const chartData = data?.data.map((val) => ({
    date: val.date,
    duration: val.duration,
  }));

  if (isLoading) {
    return <Loader absolute />;
  }

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
