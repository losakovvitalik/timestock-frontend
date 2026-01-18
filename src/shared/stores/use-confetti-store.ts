'use client';

import { create } from 'zustand';

interface ConfettiState {
  isActive: boolean;
  fire: () => void;
  reset: () => void;
}

export const useConfettiStore = create<ConfettiState>()((set) => ({
  isActive: false,
  fire: () => set({ isActive: true }),
  reset: () => set({ isActive: false }),
}));
