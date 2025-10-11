import { TaskDTO } from '@/entities/task/model/task-types';
import { useActiveTimeEntry } from '@/entities/time-entry/hooks/use-active-time-entry';
import { Button } from '@/shared/ui/button';
import { TooltipButton } from '@/shared/ui/tooltip-button';
import { Pause, Play } from 'lucide-react';
import { useStartTaskTimer } from '../hooks/use-start-task-timer';
import { useStopTaskTimer } from '../hooks/use-stop-task-timer';

export interface StartTaskTimerButtonProps {
  task: TaskDTO;
}

export function StartTaskTimerButton({ task }: StartTaskTimerButtonProps) {
  const { data: activeTimeEntry } = useActiveTimeEntry();

  const { stop, isStopPending } = useStopTaskTimer();
  const { start, isStartPending } = useStartTaskTimer({
    task,
  });

  return (
    <TooltipButton title="Запустить таймер">
      <Button
        className="size-8"
        onClick={activeTimeEntry ? stop : start}
        disabled={isStartPending || isStopPending}
        size="icon"
        variant="secondary"
      >
        {activeTimeEntry?.task?.documentId === task.documentId ? (
          <Pause className="fill-white" />
        ) : (
          <Play className="fill-white" />
        )}
      </Button>
    </TooltipButton>
  );
}
