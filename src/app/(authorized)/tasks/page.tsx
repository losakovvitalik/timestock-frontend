import { TasksPageClient } from '@/app/(authorized)/tasks/page-client';
import { PageTitle } from '@/shared/ui/page-title';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Задачи',
};

export default function TasksPage() {
  return (
    <div className="relative h-full">
      <PageTitle>Задачи</PageTitle>
      <TasksPageClient />
    </div>
  );
}
