import { Typography } from '@/shared/ui/typography';
import { SearchX } from 'lucide-react';

export function TimeEntryNotFoundState() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
      <SearchX className="text-muted-foreground size-12" />

      <div className="flex flex-col gap-2">
        <Typography variant="subtitle">Ничего не найдено</Typography>
      </div>
    </div>
  );
}
