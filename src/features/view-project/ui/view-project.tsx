'use client';

import { projectApiHooks } from '@/entities/project/api/project-api-hooks';
import { formatDisplayDate } from '@/shared/lib/date/format-display-date';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Loader } from '@/shared/ui/loader';
import { ViewProjectChart } from './view-project-chart';

export interface ViewProjectProps {
  projectId: string;
}

export function ViewProject({ projectId }: ViewProjectProps) {
  const { data: project } = projectApiHooks.useGet(projectId, {
    params: {
      populate: {
        color: true,
      },
    },
  });

  if (!project) {
    return <Loader absolute />;
  }

  return (
    <div>
      <Card>
        <CardHeader className="flex items-center gap-2">
          <div
            className="size-6 rounded-full"
            style={{
              background: project.color.hex,
            }}
          />
          <CardTitle className="text-2xl">{project?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div>Создан: {formatDisplayDate(project.createdAt)}</div>
          <div>Потрачено времени: {(project.time_spent / 3600).toFixed(2)} ч</div>
        </CardContent>
      </Card>
      <ViewProjectChart projectId={projectId} />
    </div>
  );
}
