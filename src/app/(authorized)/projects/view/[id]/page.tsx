import { ViewProject } from '@/features/view-project/ui/view-project';
import { PageProps } from '@/shared/types/next';
import { PageTitle } from '@/shared/ui/page-title';

export default async function ViewProjectPage({ params }: PageProps<{ id: string }>) {
  const { id } = await params;

  return (
    <div>
      <PageTitle>Просмотр проекта</PageTitle>
      <ViewProject projectId={id} />
    </div>
  );
}
