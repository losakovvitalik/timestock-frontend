import { ProjectDTO } from '@/entities/project/models/types';
import { paths } from '@/shared/constants';
import { Card, CardContent } from '@/shared/ui/card';
import { Typography } from '@/shared/ui/typography';
import { formatDuration } from '@/shared/utils/duration';
import Link from 'next/link';

export interface ProjectListItemProps {
  project: ProjectDTO;
}

export function ProjectListItem({ project }: ProjectListItemProps) {
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

          <Typography className="text-lg font-semibold">
            {formatDuration(project.time_spent)}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
