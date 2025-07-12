'use client';

import { PropsWithChildren, useEffect } from 'react';
import { usePageTitle } from '../hooks/use-page-title';

export function PageTitle({ children }: PropsWithChildren) {
  usePageTitle(children);

  useEffect(() => {
    console.log(children, typeof children);
    if (children && typeof children === 'string') {
      document.title = children;
    }
  }, [children]);

  return null;
}
