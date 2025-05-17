import { Project } from '@/entities/project/models/types';
import { paths } from '@/shared/constants';
import { Button } from '@/shared/ui/button';
import { Typography } from '@/shared/ui/typography';
import { Edit } from 'lucide-react';
import Link from 'next/link';

export interface ProjectListItemProps {
  project: Project;
}

export function ProjectListItem({ project }: ProjectListItemProps) {
  return (
    <div className="bg-secondary border-border flex items-center gap-2 rounded-lg border p-2">
      <div
        className="size-4 rounded-full"
        style={{
          background: project.color.hex,
        }}
      />
      <Typography className="text-lg font-semibold">{project.name}</Typography>
      <Button className="ml-auto" size={'icon'} asChild>
        <Link href={paths.projects.edit(project.documentId)}>
          <Edit />
        </Link>
      </Button>
    </div>
  );
}
