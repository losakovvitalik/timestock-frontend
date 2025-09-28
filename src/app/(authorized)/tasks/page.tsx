import { CreateTaskDialog } from '@/features/task/create-task/ui/create-task-dialog';
import { PageTitle } from '@/shared/ui/page-title';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Задачи',
};

export default function ProjectsPage() {
  return (
    <div className="relative h-full">
      <PageTitle>Задачи</PageTitle>
      <CreateTaskDialog />
    </div>
  );
}
