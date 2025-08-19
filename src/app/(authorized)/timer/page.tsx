import { Timer } from '@/features/timer/ui/timer';
import { TimerDrawer } from '@/features/timer/ui/timer-drawer';
import { TimerToggleButton } from '@/features/timer/ui/timer-toggle-button';
import { TimeEntryList } from '@/widgets/time-entry-list/time-entry-list';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Таймер',
};

export default function TimerPage() {
  return (
    <div className="h-full">
      <div className="grid h-full grid-rows-[1fr_112px] overflow-auto">
        <div className="border-border h-full overflow-auto border-b-2">
          <TimeEntryList />
        </div>
        <div className="flex items-center justify-between gap-8 py-4">
          <div className="flex w-full flex-col gap-4">
            <Timer />
            <TimerDrawer />
          </div>
          <div>
            <TimerToggleButton />
          </div>
        </div>
      </div>
    </div>
  );
}
