import { paths } from '@/shared/constants';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';

export function testFn() {}

export function CreateProjectLink() {
  return (
    <Button className="rounded-full px-6" asChild>
      <Link href={paths.project.create}>Добавить проект</Link>
    </Button>
  );
}
