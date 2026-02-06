'use client';

import { Logo } from '@/shared/ui/logo';
import { Typography } from '@/shared/ui/typography';

export function TaskListEmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
      <Logo size="lg" />

      <div className="flex flex-col gap-2">
        <Typography variant="subtitle">У вас пока нет задач</Typography>
        <Typography variant="muted" className="max-w-xs">
          Создайте свою первую задачу, чтобы организовать работу и отслеживать прогресс!
        </Typography>
      </div>
    </div>
  );
}
