'use client';

import { PropsWithChildren } from 'react';
import { usePageTitle } from '../hooks/use-page-title';

export function PageTitle({ children }: PropsWithChildren) {
  usePageTitle(children);
  return null;
}
