import { CreateTaskDialog } from '@/features/task/create-task/ui/create-task-dialog';
import { PageTitle } from '@/shared/ui/page-title';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { TaskList } from '@/widgets/task-list/task-list';
import { Metadata } from 'next';
import { SelectSorting } from './select-sorting';

export const metadata: Metadata = {
  title: 'Задачи',
};

export default function TaskPage() {
  return (
    <div className="relative h-full">
      <PageTitle>Задачи</PageTitle>
      <Tabs defaultValue="in_work">
        <div className="flex gap-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="in_work">В работе</TabsTrigger>
            <TabsTrigger value="all">Все</TabsTrigger>
            <TabsTrigger value="completed">Выполненные</TabsTrigger>
          </TabsList>
          <SelectSorting />
          <CreateTaskDialog />
        </div>

        <TabsContent value="in_work">
          <TaskList isCompleted={false} />
        </TabsContent>
        <TabsContent value="all">
          <TaskList />
        </TabsContent>
        <TabsContent value="completed">
          <TaskList isCompleted={true} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
