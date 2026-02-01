import { ProjectDTO } from '@/entities/project/models/types';
import { paths } from '@/shared/constants';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Typography } from '@/shared/ui/typography';
import { Edit } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export interface ProjectListItemProps {
  project: ProjectDTO;
}

export function ProjectListItem({ project }: ProjectListItemProps) {
  const router = useRouter();

  const handleEditClick = (e: React.MouseEvent) => {
    // Предотвращаем клик по ссылке снаружи
    e.stopPropagation();
    e.preventDefault();
    router.push(paths.project.edit(project.documentId));
  };

  return (
    <Link className="block" href={paths.project.view(project.documentId)}>
      <Card className="hover:bg-card/90 border-none transition-colors">
        <CardContent className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div
              className="size-4 rounded-full"
              style={{
                background: project?.color?.hex,
              }}
            />
            <Typography className="text-lg font-semibold">{project.name}</Typography>
          </div>

          <div className="flex items-center gap-4">
            <Typography className="text-lg font-semibold">
              {(project.time_spent / 3600).toFixed(2)} ч
            </Typography>
            <Button className="size-8" onClick={handleEditClick} size="icon">
              <Edit className="size-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
