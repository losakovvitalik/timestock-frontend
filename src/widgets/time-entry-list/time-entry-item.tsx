import { TimeEntryDTO } from '@/entities/time-entry/model/types';
import { TimeEntryDeleteButton } from '@/features/time-entry-delete/ui/time-entry-delete-button';
import { TimeEntryStartAgainButton } from '@/features/time-entry-start-again/ui/time-entry-start-again-button';
import { formatDisplayDate } from '@/shared/lib/date/format-display-date';
import { cn } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardTitle } from '@/shared/ui/card';
import { Typography } from '@/shared/ui/typography';
import { formatDuration } from '@/shared/utils/duration';
import { TimeEntryView } from '@/widgets/time-entry-list/time-entry-view';

export interface TimeEntryItemProps {
  entry: TimeEntryDTO;
}

export function TimeEntryItem({ entry }: TimeEntryItemProps) {
  return (
    <Card className="py-2">
      <CardContent className="grid grid-cols-[1fr_auto] items-center gap-4 px-2">
        <TimeEntryView
          entry={entry}
          trigger={
            <button className="flex cursor-pointer flex-col items-start gap-1">
              <CardTitle
                className={cn('line-clamp-1 text-left leading-5', {
                  'opacity-70': !entry.description,
                })}
              >
                {entry.description || 'Без описания'}
              </CardTitle>
              <div className="flex items-center gap-1">
                <Typography className="text-sm font-semibold">
                  {formatDuration(entry.duration || 0)}
                </Typography>
                <Badge variant={'secondary'}>
                  {entry.project && (
                    <div
                      className="size-2.5 rounded-full"
                      style={{
                        backgroundColor: entry.project.color.hex,
                      }}
                    />
                  )}
                  <Typography size={'xs'}>{entry.project?.name || 'Проект не указан'}</Typography>
                </Badge>
                <Badge variant={'secondary'}>
                  <Typography size={'xs'}>{formatDisplayDate(entry.createdAt)}</Typography>
                </Badge>
              </div>
            </button>
          }
        />
        <div className="flex gap-2">
          <TimeEntryStartAgainButton entry={entry} />
          <TimeEntryDeleteButton entry={entry} />
        </div>
      </CardContent>
    </Card>
  );
}
