import { cn } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardTitle } from '@/shared/ui/card';
import { Typography } from '@/shared/ui/typography';
import { formatDuration } from '@/shared/utils/format-duration';
import { Trash } from 'lucide-react';
import { TimeEntry } from '../model/types';
import { TimeEntryDrawer } from './time-entry-drawer';
import { TimeEntryStartAgainButton } from './time-entry-start-again-button';

export interface TimeEntryItemProps {
  entry: TimeEntry;
}

export function TimeEntryItem({ entry }: TimeEntryItemProps) {
  return (
    <Card
      className="py-2"
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('button')) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      <CardContent className="grid grid-cols-[1fr_auto] items-center gap-4 px-2">
        <TimeEntryDrawer
          entry={entry}
          trigger={
            <button className="flex cursor-pointer flex-col items-start gap-1">
              <CardTitle
                className={cn('line-clamp-1 leading-5 text-left', {
                  'opacity-70': !entry.description,
                })}
              >
                {entry.description || 'Без описания'}
              </CardTitle>
              <div className="flex items-center gap-1">
                <Typography className="text-xs font-semibold">
                  {formatDuration(entry.start_time, entry.end_time || undefined)}
                </Typography>
                <Badge variant={'secondary'}>
                  {entry.project && (
                    <div
                      className="size-2.5 rounded-full"
                      style={{
                        backgroundColor: entry.project?.color,
                      }}
                    />
                  )}
                  <Typography className="text-[10px]">
                    {entry.project?.name || 'Проект не указан'}
                  </Typography>
                </Badge>
              </div>
            </button>
          }
        />
        <div className="flex gap-2">
          <TimeEntryStartAgainButton entry={entry} />
          <Button className="size-8" variant={'destructive'}>
            <Trash />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
