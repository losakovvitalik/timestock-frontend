import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';
import { useTimeEntryListContext } from './time-entry-list.context';

export type TimeEntryListState = {
  openId: string | null;
  open: (id: string) => void;
  close: (id?: string) => void;
  closeAll: () => void;
};

// Фабрика vanilla-store — новый инстанс на каждый список
export function createTimeEntryListStore(initial?: Partial<TimeEntryListState>) {
  return createStore<TimeEntryListState>((set, get) => ({
    openId: null,
    open: (id) => set({ openId: id }),
    close: (id) => {
      const { openId } = get();
      if (!id || id === openId) set({ openId: null });
    },
    closeAll: () => set({ openId: null }),
    ...initial,
  }));
}

// Хук-помощник для компонент React (работает поверх контекста ниже)
export function useTimeEntryList<T>(selector: (s: TimeEntryListState) => T) {
  const ctx = useTimeEntryListContext();
  return useStore(ctx.store, selector);
}
