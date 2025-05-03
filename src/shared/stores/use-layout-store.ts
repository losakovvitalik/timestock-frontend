'use client';
import { PropsWithChildren } from 'react';
import { create } from 'zustand';

export interface LayoutState {
  title: React.ReactNode | null;
  setTitle: (value: React.ReactNode | null) => void;
}

export interface Test extends PropsWithChildren {}

const useLayoutStore = create<LayoutState>()((set) => ({
  title: null,
  setTitle: (value) => {
    set({
      title: value,
    });
  },
}));

export default useLayoutStore;
