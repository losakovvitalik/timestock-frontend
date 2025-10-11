import { TaskDTO } from '@/entities/task/model/task-types';
import { useTaskCompletion } from '@/features/task/task-completion/hooks/use-task-completion';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { TooltipWrapper } from '@/shared/ui/tooltip-wrapper';
import { Check } from 'lucide-react';

export interface TaskItemCompleteButtonProps {
  item: TaskDTO;
}

export function TaskItemCompleteButton({ item }: TaskItemCompleteButtonProps) {
  const isCompleted = item.is_completed;
  const { completeTask, reopenTask, isPending } = useTaskCompletion({
    taskId: item.documentId,
  });

  return (
    <TooltipWrapper title={isCompleted ? 'Вернуть в работу' : 'Отметить выполненной'}>
      <Button
        onClick={isCompleted ? reopenTask : completeTask}
        disabled={isPending}
        className={cn('size-6 rounded-full border-2 bg-transparent', {
          'border-none bg-white hover:bg-white/80': isCompleted,
        })}
        size="icon"
        variant="secondary"
      >
        {isCompleted ? <Check className="stroke-secondary" strokeWidth={3.5} /> : null}
      </Button>
    </TooltipWrapper>
  );
}
