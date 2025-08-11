import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import ConfirmPopup from '@/shared/ui/confirm-popup';
import { Trash } from 'lucide-react';
import toast from 'react-hot-toast';
import { timeEntryApiHooks } from '../../../entities/time-entry/api/time-entry-api-hooks';
import { TimeEntryDTO } from '../../../entities/time-entry/model/types';

export interface TimeEntryDeleteButtonProps {
  entry: TimeEntryDTO;
  className?: string;
}

export function TimeEntryDeleteButton({ entry, className }: TimeEntryDeleteButtonProps) {
  const timeEntryDelete = timeEntryApiHooks.useDelete({
    onError: () => {
      toast.error('Не удалось удалить запись времени');
    },
  });

  const handleDelete = () => {
    timeEntryDelete.mutate(entry.documentId);
  };

  return (
    <ConfirmPopup
      title="Вы уверены что хотите удалить запись?"
      description={<span className="italic">{entry.description || 'Без описания'}</span>}
      onConfirm={handleDelete}
      trigger={
        <Button className={cn('size-8', className)} variant={'destructive'}>
          <Trash />
        </Button>
      }
    />
  );
}
