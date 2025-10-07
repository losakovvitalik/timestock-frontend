import { Badge } from '@/shared/ui/badge';
import { Typography } from '@/shared/ui/typography';
import { Folder } from 'lucide-react';
import { ProjectDTO } from '../models/types';

export interface ProjectBadgeProps {
  project: ProjectDTO | undefined;
}

export function ProjectBadge({ project }: ProjectBadgeProps) {
  return (
    <Badge className="h-5" variant={'secondary'}>
      <Folder className="!size-2.5 fill-white" />
      <Typography size={'xs'}>{project ? project?.name : 'Проект не указан'}</Typography>
      {project && (
        <div
          className="size-2.5 rounded-full"
          style={{
            backgroundColor: project?.color.hex,
          }}
        />
      )}
    </Badge>
  );
}
