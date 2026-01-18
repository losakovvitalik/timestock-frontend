'use client';

import { useActiveTimeEntry } from '@/entities/time-entry/hooks/use-active-time-entry';
import { useStartTimeEntry } from '@/entities/time-entry/hooks/use-start-time-entry';
import { useStopTimeEntry } from '@/entities/time-entry/hooks/use-stop-time-entry';
import { useUpdateUser } from '@/entities/user/hooks/use-update-user';
import { useUser } from '@/entities/user/hooks/use-user';
import { cn } from '@/shared/lib/utils';
import { useConfettiStore } from '@/shared/stores/use-confetti-store';
import { AnimatedButton } from '@/shared/ui/animated/animated-button';
import { Play } from 'lucide-react';
import { toast } from 'sonner';

export interface TimerToggleButtonProps {
  className?: string;
}

export function TimerToggleButton({ className }: TimerToggleButtonProps) {
  const { user } = useUser();
  const updateUser = useUpdateUser();
  const fireConfetti = useConfettiStore((s) => s.fire);

  const startTimer = useStartTimeEntry({
    onError: () => {
      toast.error('Не удалось запустить таймер. Попробуйте ещё раз');
    },
  });
  const stopTimer = useStopTimeEntry({
    onSuccess: () => {
      if (user && !user.first_timer_completed_at) {
        fireConfetti();
        updateUser.mutate({
          id: user.id,
          data: { first_timer_completed_at: new Date().toISOString() },
        });
      }
    },
    onError: () => {
      toast.error('Не удалось остановить таймер. Что-то пошло не так.');
    },
  });
  const { data: activeTimeEntry } = useActiveTimeEntry();

  const handleClick = () => {
    if (activeTimeEntry) {
      stopTimer.mutate();
    } else {
      startTimer.mutate();
    }
  };

  const isPending = startTimer.isPending || stopTimer.isPending;

  return (
    <AnimatedButton
      className={cn('size-20 rounded-full p-2', className)}
      disabled={isPending}
      onClick={handleClick}
      whileTap={{ scale: 0.8 }}
      variant={activeTimeEntry ? 'destructive' : 'default'}
    >
      {activeTimeEntry ? (
        <div className="aspect-square size-6/12 rounded-[1px] bg-white/90" />
      ) : (
        <Play className="size-8/12 fill-white stroke-white" />
      )}
    </AnimatedButton>
  );
}
