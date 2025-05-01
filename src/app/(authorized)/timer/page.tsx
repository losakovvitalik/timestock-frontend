import { StartTimerButton } from '@/features/start-stop-timer/ui/start-timer-button';
import { Timer } from '@/features/start-stop-timer/ui/timer';

export default function TimerPage() {
  return (
    <div className="grid h-full grid-rows-2">
      <div className="flex items-center justify-center border-b-2 border-border">
        <div className="flex flex-col items-center gap-4">
          <StartTimerButton />
          <Timer />
        </div>
      </div>
    </div>
  );
}
