import { TimeEntryDTO } from '@/entities/time-entry/model/types';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Trash } from 'lucide-react';
import { TimeEntryDeletePopup } from './time-entry-delete-popup';

export interface TimeEntryDeleteButtonProps {
  entry: TimeEntryDTO;
  className?: string;
}

export function TimeEntryDeleteButton({ entry, className }: TimeEntryDeleteButtonProps) {
  return (
    <TimeEntryDeletePopup
      entry={entry}
      trigger={
        <Button className={cn('size-8', className)} variant="destructive">
          <Trash />
        </Button>
      }
    />
  );
}
