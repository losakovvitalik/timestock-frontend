import { Button } from '@/shared/ui/button';
import ConfirmPopup from '@/shared/ui/confirm-popup';
import { Play } from 'lucide-react';
import { useActiveTimeEntry } from '../hooks/use-active-time-entry';
import { useTimeEntryStartAgain } from '../hooks/use-time-entry-start-again';
import { TimeEntry } from '../model/types';

export interface TimeEntryStartAgainButtonProps {
  entry: TimeEntry;
}

export function TimeEntryStartAgainButton({ entry }: TimeEntryStartAgainButtonProps) {
  const activeTimeEntry = useActiveTimeEntry();
  const startAgain = useTimeEntryStartAgain({
    entry,
  });

  const handleClick = () => {
    startAgain.mutate(undefined);
  };

  if (activeTimeEntry.data) {
    return (
      <ConfirmPopup
        title="Вы точно хотите запустить новый таймер?"
        description="У вас уже есть запущенный таймер, он будет остановлен"
        onConfirm={handleClick}
        trigger={
          <Button className="size-8" variant={'outline'}>
            <Play />
          </Button>
        }
      />
    );
  }

  return (
    <Button onClick={handleClick} className="size-8" variant={'outline'}>
      <Play />
    </Button>
  );
}
