'use client';

import { createContext, useContext } from 'react';
import type { StoreApi } from 'zustand/vanilla';
import { TimeEntryListState } from './time-entry-list.store';

export const SwipeActionsContext = createContext<{ store: StoreApi<TimeEntryListState> } | null>(
  null,
);

export function useTimeEntryListContext() {
  const ctx = useContext(SwipeActionsContext);
  if (!ctx) {
    throw new Error('TimeEntryListContext.Provider is missing');
  }
  return ctx;
}
