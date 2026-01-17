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
      <div className="grid h-full grid-rows-[1fr_auto] overflow-auto md:grid-rows-[1fr]">
        <div className="border-border h-full overflow-auto border-b md:border-b-0">
          <TimeEntryList />
        </div>
        {/* Нижняя панель только для мобильных — на ПК таймер в сайдбаре */}
        <div className="flex items-center gap-3 py-3 md:hidden">
          <TimerDrawer />
          <div className="min-w-0 flex-1">
            <Timer />
          </div>
          <TimerToggleButton className="size-12" />
        </div>
      </div>
    </div>
  );
}
