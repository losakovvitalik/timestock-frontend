import { Typography } from '@/shared/ui/typography';
import { SearchX } from 'lucide-react';

export function ProjectListSearchEmptyState() {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center gap-4 text-center">
      <SearchX className="text-muted-foreground size-12" />

      <div className="flex flex-col gap-2">
        <Typography variant="subtitle">Ничего не найдено</Typography>
        <Typography variant="muted" className="max-w-xs">
          Попробуйте изменить поисковый запрос
        </Typography>
      </div>
    </div>
  );
}
