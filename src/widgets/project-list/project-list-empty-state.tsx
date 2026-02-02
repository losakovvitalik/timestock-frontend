'use client';

import { paths } from '@/shared/constants';
import { Button } from '@/shared/ui/button';
import { Logo } from '@/shared/ui/logo';
import { Typography } from '@/shared/ui/typography';
import { FolderPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function ProjectListEmptyState() {
  const router = useRouter();

  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center gap-4 text-center">
      <Logo size="lg" />

      <div className="flex flex-col gap-2">
        <Typography variant="subtitle">Создайте свой первый проект</Typography>
        <Typography variant="muted" className="max-w-xs">
          У вас ещё нет ни одного проекта. Создайте проект, чтобы начать отслеживать время!
        </Typography>
      </div>

      <Button variant="outline" onClick={() => router.push(paths.project.create)}>
        <FolderPlus className="size-4" />
        Создать проект
      </Button>
    </div>
  );
}
