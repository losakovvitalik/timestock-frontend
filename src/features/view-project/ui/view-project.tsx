'use client';

import { projectApiHooks } from '@/entities/project/api/project-api-hooks';
import { paths } from '@/shared/constants';
import { formatDisplayDate } from '@/shared/lib/date/format-display-date';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import ConfirmPopup from '@/shared/ui/confirm-popup';
import { Loader } from '@/shared/ui/loader';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ViewProjectChart } from './view-project-chart';

export interface ViewProjectProps {
  projectId: string;
}

export function ViewProject({ projectId }: ViewProjectProps) {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data: project } = projectApiHooks.useGet(projectId, {
    params: {
      populate: {
        color: true,
      },
    },
  });

  const deleteProject = projectApiHooks.useDelete({
    onSuccess: () => {
      router.push(paths.project.list);
    },
  });

  const handleDelete = () => {
    deleteProject.mutate(projectId);
  };

  if (!project) {
    return <Loader absolute />;
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="size-6 rounded-full"
                style={{
                  background: project?.color?.hex,
                }}
              />
              <CardTitle className="text-2xl">{project?.name}</CardTitle>
            </div>
            <Button variant="destructive" size="icon" onClick={() => setIsDeleteDialogOpen(true)}>
              <Trash2 className="size-4" />
            </Button>
          </div>
          {project?.description && (
            <p className="text-muted-foreground mt-1 text-sm">{project.description}</p>
          )}
        </CardHeader>
        <CardContent>
          <div>Создан: {formatDisplayDate(project.createdAt)}</div>
          <div>Потрачено времени: {(project.time_spent / 3600).toFixed(2)} ч</div>
        </CardContent>
      </Card>
      <ViewProjectChart projectId={projectId} />

      <ConfirmPopup
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Удалить проект?"
        description="Вы уверены, что хотите удалить этот проект? Это действие нельзя отменить."
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteDialogOpen(false)}
      />
    </div>
  );
}
