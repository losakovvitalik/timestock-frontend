import { Timer } from '@/features/timer/ui/timer';
import { TimerInfoDrawer } from '@/features/timer/ui/timer-info-drawer';
import { TimerToggleButton } from '@/features/timer/ui/timer-toggle-button';
import { PageTitle } from '@/shared/ui/page-title';
import { TimeEntryList } from '@/widgets/time-entry-list/time-entry-list';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Таймер',
};

export default function TimerPage() {
  return (
    <div className="h-full">
      <PageTitle>Таймер</PageTitle>
      <div className="grid h-full grid-rows-[1fr_112px] overflow-auto">
        <div className="border-border h-full overflow-auto border-b-2">
          <TimeEntryList />
        </div>
        <div className="flex items-center justify-between gap-8 py-4">
          <div className="flex w-full flex-col gap-4">
            <Timer />
            <TimerInfoDrawer />
          </div>
          <div>
            <TimerToggleButton />
          </div>
        </div>
      </div>
    </div>
  );
}
