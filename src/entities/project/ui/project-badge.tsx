import { Badge } from '@/shared/ui/badge';
import { Typography } from '@/shared/ui/typography';
import { ProjectDTO } from '../models/types';

export interface ProjectBadgeProps {
  project: ProjectDTO | undefined;
}

function hexToRgba(hex: string, alpha: number = 1) {
  const [r, g, b] = hex
    .replace('#', '')
    .match(/.{1,2}/g)!
    .map((x) => parseInt(x, 16));
  return `rgba(${r}, ${g}, ${b}, var(--project-bg-alpha, ${alpha}))`;
}

export function ProjectBadge({ project }: ProjectBadgeProps) {
  const color = project?.color?.hex || '#ccc';

  return (
    <Badge
      style={{
        backgroundColor: hexToRgba(color),
      }}
      className="h-5 [--project-bg-alpha:0.9] dark:[--project-bg-alpha:0.7]"
      variant="secondary"
    >
      <Typography className="text-white" size="xs">
        {project ? project?.name : 'Проект не указан'}
      </Typography>
    </Badge>
  );
}
