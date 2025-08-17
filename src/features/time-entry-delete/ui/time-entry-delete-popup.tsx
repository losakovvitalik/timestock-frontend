import { timeEntryApiHooks } from '@/entities/time-entry/api/time-entry-api-hooks';
import { TimeEntryDTO } from '@/entities/time-entry/model/types';
import ConfirmPopup, { ConfirmPopupProps } from '@/shared/ui/confirm-popup';
import { toast } from 'sonner';

export interface TimeEntryDeletePopupProps
  extends Omit<ConfirmPopupProps, 'title' | 'description' | 'onConfirm'> {
  entry: TimeEntryDTO;
}

export function TimeEntryDeletePopup({ entry, ...props }: TimeEntryDeletePopupProps) {
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
      {...props}
    />
  );
}
