import { useActiveTimeEntry } from '@/entities/time-entry/hooks/use-active-time-entry';
import { TimeEntryDTO } from '@/entities/time-entry/model/types';
import { Button } from '@/shared/ui/button';
import ConfirmPopup from '@/shared/ui/confirm-popup';
import { Play } from 'lucide-react';
import { useTimeEntryStartAgain } from '../hooks/use-time-entry-start-again';

export interface TimeEntryStartAgainButtonProps {
  entry: TimeEntryDTO;
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
          <Button className="size-8" variant="secondary">
            <Play className="fill-white" />
          </Button>
        }
      />
    );
  }

  return (
    <Button onClick={handleClick} className="size-8" variant="secondary">
      <Play className="fill-white" />
    </Button>
  );
}
