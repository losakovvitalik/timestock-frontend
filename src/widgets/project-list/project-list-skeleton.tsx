import { Card, CardContent } from '@/shared/ui/card';
import { Skeleton } from '@/shared/ui/skeleton';

export function ProjectListItemSkeleton() {
  return (
    <Card className="border-none">
      <CardContent className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 rounded-full" />
          <Skeleton className="h-7 w-32" />
        </div>

        <div className="flex items-center gap-4">
          <Skeleton className="h-7 w-16" />
          <Skeleton className="size-8 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}

export function ProjectListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <ul className="mt-2 flex flex-col gap-3">
      {Array.from({ length: count }).map((_, index) => (
        <li key={index}>
          <ProjectListItemSkeleton />
        </li>
      ))}
    </ul>
  );
}
