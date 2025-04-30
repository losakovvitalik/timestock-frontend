import { StartTimerButton } from '@/features/start-timer/ui/start-timer-button';

export default function TimerPage() {
  return (
    <div className="grid h-full grid-rows-2">
      <div className="flex items-center justify-center">
        <StartTimerButton />
      </div>
    </div>
  );
}
