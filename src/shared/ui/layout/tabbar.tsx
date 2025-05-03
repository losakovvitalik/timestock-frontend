'use client';

import { paths } from '@/shared/constants';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Clock, FolderOpen, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface TabbarLinkProps {
  icon: React.ReactNode;
  link: string;
}

export function TabbarLink({ icon, link }: TabbarLinkProps) {
  const pathname = usePathname();

  return (
    <Button
      className={cn('border-2', {
        'ring-ring/50 dark:border-primary/60 border-primary/50 ring-[2px]': pathname === link,
      })}
      asChild
      size={'icon'}
      variant={'outline'}
    >
      <Link href={link}>{icon}</Link>
      {/* <Typography size={'xs'}>Таймер</Typography> */}
    </Button>
  );
}

export function Tabbar() {
  return (
    <nav>
      <ul className="flex justify-between border border-t px-10 py-3">
        <li className="flex flex-col items-center gap-1">
          <TabbarLink icon={<FolderOpen />} link={paths.projects.link} />
        </li>
        <li className="flex flex-col items-center gap-1">
          <TabbarLink icon={<Clock />} link={paths.timer.link} />
        </li>
        <li className="flex flex-col items-center gap-1">
          <TabbarLink icon={<Menu />} link={paths.menu.link} />
        </li>
      </ul>
    </nav>
  );
}
