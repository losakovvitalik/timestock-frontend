import { Button } from '@/shared/ui/button';
import ConfirmPopup from '@/shared/ui/confirm-popup';
import { Trash } from 'lucide-react';
import toast from 'react-hot-toast';
import { timeEntryApiHooks } from '../../../entities/time-entry/api/time-entry-api-hooks';
import { TimeEntry } from '../../../entities/time-entry/model/types';

export interface TimeEntryDeleteButtonProps {
  entry: TimeEntry;
}

export function TimeEntryDeleteButton({ entry }: TimeEntryDeleteButtonProps) {
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
        <Button className="size-8" variant={'destructive'}>
          <Trash />
        </Button>
      }
    />
  );
}
