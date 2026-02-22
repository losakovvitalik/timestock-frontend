import { ViewProject, ViewProjectChart } from '@/features/view-project';
import { PageProps } from '@/shared/types/next';
import { PageTitle } from '@/shared/ui/page-title';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { ProjectReminderList } from '@/widgets/reminder-list';
import { TimeEntryList } from '@/widgets/time-entry-list';

export default async function ViewProjectPage({ params }: PageProps<{ id: string }>) {
  const { id } = await params;

  return (
    <div>
      <PageTitle>Просмотр проекта</PageTitle>
      <ViewProject projectId={id} />
      <Tabs className="mt-4" defaultValue="analytics">
        <TabsList>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
          <TabsTrigger value="reminders">Уведомления</TabsTrigger>
          <TabsTrigger value="time-entries">Треки времени</TabsTrigger>
        </TabsList>
        <TabsContent value="analytics">
          <ViewProjectChart projectId={id} />
        </TabsContent>
        <TabsContent value="reminders">
          <ProjectReminderList projectId={id} />
        </TabsContent>
        <TabsContent value="time-entries">
          <TimeEntryList params={{ filters: { project: { documentId: id } } }} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
