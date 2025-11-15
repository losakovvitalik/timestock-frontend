import { paths } from '@/shared/constants';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';

export interface CreateProjectLinkProps {
  className?: string;
}

export function CreateProjectLink({ className }: CreateProjectLinkProps) {
  return (
    <Button className={cn('rounded-full px-6', className)} asChild>
      <Link href={paths.project.create}>Добавить проект</Link>
    </Button>
  );
}
