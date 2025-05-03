import { Typography } from '@/shared/ui/typography';
import { Edit } from 'lucide-react';

export function ProjectItem() {
  return (
    <div className="bg-secondary border-border flex items-center gap-2 rounded-lg border p-2">
      <div className="size-4 rounded-full bg-yellow-200" />
      <Typography className="text-lg font-semibold">Timestock</Typography>
      <Edit className="ml-auto size-5" />
    </div>
  );
}
