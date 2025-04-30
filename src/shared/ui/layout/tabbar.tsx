import { paths } from '@/shared/constants';
import { Button } from '@/shared/ui/button';
import { Clock, FolderOpen, Menu } from 'lucide-react';
import Link from 'next/link';
import Typography from '../typography';

function Tabbar() {
  return (
    <nav>
      <ul className="flex justify-between border border-t px-10 py-2">
        <li className="flex flex-col items-center gap-1">
          <Button asChild size={'icon'} variant={'outline'}>
            <Link href={paths.projects.link}>
              <FolderOpen />
            </Link>
          </Button>
          <Typography size={'xs'}>Проекты</Typography>
        </li>
        <li className="flex flex-col items-center gap-1">
          <Button asChild size={'icon'} variant={'outline'}>
            <Link href={paths.timer.link}>
              <Clock />
            </Link>
          </Button>
          <Typography size={'xs'}>Таймер</Typography>
        </li>
        <li className="flex flex-col items-center gap-1">
          <Button asChild size={'icon'} variant={'outline'}>
            <Link href={paths.menu.link}>
              <Menu />
            </Link>
          </Button>
          <Typography size={'xs'}>Меню</Typography>
        </li>
      </ul>
    </nav>
  );
}

export { Tabbar };
