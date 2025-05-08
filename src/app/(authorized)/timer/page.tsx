import { Timer } from '@/features/timer/ui/timer';
import { TimerInfoDrawer } from '@/features/timer/ui/timer-info-drawer';
import { TimerToggleButton } from '@/features/timer/ui/timer-toggle-button';
import { PageTitle } from '@/shared/ui/page-title';
import { TimeEntryList } from '@/widgets/time-entry-list';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Таймер',
};

export default function TimerPage() {
  return (
    <div className="h-full">
      <PageTitle>Таймер</PageTitle>
      <div className="grid h-full grid-rows-[1fr_auto]">
        <div className="border-border border-b-2">
          <TimeEntryList />
        </div>
        <div className="flex flex-col items-center gap-4 py-4">
          <TimerToggleButton />
          <Timer />
          <TimerInfoDrawer />
        </div>
      </div>
    </div>
  );
}
