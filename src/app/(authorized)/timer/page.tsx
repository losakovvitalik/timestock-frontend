import { TimerButton } from '@/features/start-stop-timer/ui/timer-button';
import { Timer } from '@/features/start-stop-timer/ui/timer';
import { PageTitle } from '@/shared/ui/page-title';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Таймер',
};

export default function TimerPage() {
  return (
    <div className="grid h-full grid-rows-2">
      <PageTitle>Таймер</PageTitle>
      <div className="border-border flex items-center justify-center border-b-2">
        <div className="flex flex-col items-center gap-4">
          <TimerButton />
          <Timer />
        </div>
      </div>
    </div>
  );
}
