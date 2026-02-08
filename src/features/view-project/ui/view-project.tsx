'use client';

import { projectApiHooks } from '@/entities/project/api/project-api-hooks';
import { paths } from '@/shared/constants';
import { formatDisplayDate } from '@/shared/lib/date/format-display-date';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import ConfirmPopup from '@/shared/ui/confirm-popup';
import { Loader } from '@/shared/ui/loader';
import { formatDuration } from '@/shared/utils/duration';
import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
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
      <Card className="justify-center">
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
              <Badge variant="outline">{formatDisplayDate(project.createdAt)}</Badge>
              <Badge variant="secondary">{formatDuration(project.time_spent)}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" asChild>
                <Link href={paths.project.edit(projectId)}>
                  <Edit className="size-4" />
                </Link>
              </Button>
              <Button variant="destructive" size="icon" onClick={() => setIsDeleteDialogOpen(true)}>
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
          {project?.description && (
            <p className="text-muted-foreground mt-1 text-sm">{project.description}</p>
          )}
          {project.description && <CardDescription>{project.description}</CardDescription>}
        </CardHeader>
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
