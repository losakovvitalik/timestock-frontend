import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardTitle } from '@/shared/ui/card';
import { Typography } from '@/shared/ui/typography';
import { formatDuration } from '@/shared/utils/format-duration';
import { Copy, Edit3, Play, Trash } from 'lucide-react';
import { TimeEntry } from '../model/types';

export interface TimeEntryItemProps {
  entry: TimeEntry;
}

export function TimeEntryItem({ entry }: TimeEntryItemProps) {
  return (
    <Card className="py-2">
      <CardContent className="grid grid-cols-[1fr_auto] items-center gap-4 px-2">
        <div className="flex flex-col gap-1">
          <CardTitle className="leading-5">{entry.description}</CardTitle>
          <div className="flex gap-1 items-center">
            <Typography className="text-xs font-semibold">
              {formatDuration(entry.start_time, entry.end_time || undefined)}
            </Typography>
            <Badge variant={'secondary'}>
              <div
                className="size-2.5 rounded-full"
                style={{
                  backgroundColor: entry.project?.color,
                }}
              ></div>
              <Typography className="text-[10px]">{entry.project?.name}</Typography>
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size={'icon'} variant={'outline'}>
            <Play />
          </Button>
          <Button size={'icon'} variant={'outline'}>
            <Edit3 />
          </Button>
          <Button size={'icon'} variant={'destructive'}>
            <Trash />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
