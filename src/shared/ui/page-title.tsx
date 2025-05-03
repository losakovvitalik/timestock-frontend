'use client';

import { PropsWithChildren } from 'react';
import { usePageTitle } from '../hooks/use-page-title';

export function PageTitle({ children }: PropsWithChildren) {
  usePageTitle(children);

  // useEffect(() => {
  //   if (children && typeof children === 'string') {
  //     document.title = children;
  //   }
  // }, [children]);

  return null;
}
