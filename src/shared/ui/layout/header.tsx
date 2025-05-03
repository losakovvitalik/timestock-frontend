'use client';

import { paths } from '@/shared/constants';
import { cn } from '@/shared/lib/utils';
import useLayoutStore from '@/shared/stores/use-layout-store';
import { ArrowLeft } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Typography } from '../typography';

const Header = () => {
  const page = useLayoutStore((state) => state.title);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const currentStoredPath = sessionStorage.getItem('currentPath');
    if (currentStoredPath) {
      sessionStorage.setItem('previousPath', currentStoredPath);
    }
    sessionStorage.setItem('currentPath', window.location.pathname);
  }, [pathname]);

  const handleBack = () => {
    const previousPath = sessionStorage.getItem('previousPath');

    if (previousPath && previousPath !== window.location.pathname) {
      router.back();
    } else {
      router.push(paths.timer.link);
    }
  };

  if (!page) {
    return <div />;
  }

  const isChildPage = pathname.split('/').length > 2;

  return (
    <header
      className={cn(
        'bg-accent h-header relative flex items-center justify-center rounded-b-lg p-2 text-2xl',
        {
          'px-12': isChildPage,
        },
      )}
    >
      {isChildPage && (
        <button
          className="absolute top-1/2 left-3 -translate-y-1/2 cursor-pointer"
          onClick={handleBack}
        >
          <ArrowLeft />
        </button>
      )}
      <Typography className={'line-clamp-1 font-medium'}>{page}</Typography>
    </header>
  );
};

export default Header;
