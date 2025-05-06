import { TimeEntryItem } from '@/entities/time-entry/ui/time-entry-item';
import { Timer } from '@/features/timer/ui/timer';
import { TimerInfoDrawer } from '@/features/timer/ui/timer-info-drawer';
import { TimerToggleButton } from '@/features/timer/ui/timer-toggle-button';
import { PageTitle } from '@/shared/ui/page-title';
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
          <div className='flex flex-col gap-2'>
            <TimeEntryItem
              entry={{
                id: 20,
                documentId: 'p24a6m05ee7nhb7lzzmkhl6s',
                start_time: '2025-05-06T07:18:10.720Z',
                end_time: null,
                createdAt: '2025-05-06T07:18:10.775Z',
                updatedAt: '2025-05-06T07:20:12.387Z',
                publishedAt: '2025-05-06T07:20:12.382Z',
                description: 'Разработка таймера',
                project: {
                  id: 2,
                  documentId: 'w50q2pdd1gcogoa8itpvwxx4',
                  name: 'Timestock',
                  description: 'Проект для трекинга времени',
                  createdAt: '2025-05-03T14:17:12.356Z',
                  updatedAt: '2025-05-04T19:36:53.503Z',
                  publishedAt: '2025-05-04T19:36:53.490Z',
                  color: '#ADD8E6',
                },
              }}
            />

            <TimeEntryItem
              entry={{
                id: 20,
                documentId: 'p24a6m05ee7nhb7lzzmkhl6s',
                start_time: '2025-05-06T07:18:10.720Z',
                end_time: null,
                createdAt: '2025-05-06T07:18:10.775Z',
                updatedAt: '2025-05-06T07:20:12.387Z',
                publishedAt: '2025-05-06T07:20:12.382Z',
                description: 'Разработка таймера',
                project: {
                  id: 2,
                  documentId: 'w50q2pdd1gcogoa8itpvwxx4',
                  name: 'Timestock',
                  description: 'Проект для трекинга времени',
                  createdAt: '2025-05-03T14:17:12.356Z',
                  updatedAt: '2025-05-04T19:36:53.503Z',
                  publishedAt: '2025-05-04T19:36:53.490Z',
                  color: '#ADD8E6',
                },
              }}
            />

            <TimeEntryItem
              entry={{
                id: 20,
                documentId: 'p24a6m05ee7nhb7lzzmkhl6s',
                start_time: '2025-05-06T07:18:10.720Z',
                end_time: null,
                createdAt: '2025-05-06T07:18:10.775Z',
                updatedAt: '2025-05-06T07:20:12.387Z',
                publishedAt: '2025-05-06T07:20:12.382Z',
                description: 'Разработка таймера',
                project: {
                  id: 2,
                  documentId: 'w50q2pdd1gcogoa8itpvwxx4',
                  name: 'Timestock',
                  description: 'Проект для трекинга времени',
                  createdAt: '2025-05-03T14:17:12.356Z',
                  updatedAt: '2025-05-04T19:36:53.503Z',
                  publishedAt: '2025-05-04T19:36:53.490Z',
                  color: '#ADD8E6',
                },
              }}
            />
          </div>
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
