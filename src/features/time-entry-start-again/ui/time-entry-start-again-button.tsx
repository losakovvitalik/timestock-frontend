import { useActiveTimeEntry } from '@/entities/time-entry/hooks/use-active-time-entry';
import { TimeEntryDTO } from '@/entities/time-entry/model/types';
import { Button, ButtonProps } from '@/shared/ui/button';
import ConfirmPopup from '@/shared/ui/confirm-popup';
import { TooltipWrapper } from '@/shared/ui/tooltip-wrapper';
import { Play } from 'lucide-react';
import { useTimeEntryStartAgain } from '../hooks/use-time-entry-start-again';

export interface TimeEntryStartAgainButtonProps {
  entry: TimeEntryDTO;
}

const TriggerButton = (props: ButtonProps) => (
  <TooltipWrapper title="Запустить">
    <Button className="size-8" variant="default" {...props}>
      <Play className="fill-white stroke-white" />
    </Button>
  </TooltipWrapper>
);

export function TimeEntryStartAgainButton({ entry }: TimeEntryStartAgainButtonProps) {
  const activeTimeEntry = useActiveTimeEntry();
  const startAgain = useTimeEntryStartAgain({
    entry,
  });

  const handleStartAgain = () => {
    startAgain.mutate(undefined);
  };

  if (activeTimeEntry.data) {
    return (
      <ConfirmPopup
        title="Вы точно хотите запустить новый таймер?"
        description="У вас уже есть запущенный таймер, он будет остановлен"
        onConfirm={handleStartAgain}
        trigger={<TriggerButton />}
      />
    );
  }

  return <TriggerButton onClick={handleStartAgain} />;
}
