'use client';

import { useConfettiStore } from '@/shared/stores/use-confetti-store';
import { Confetti as NeoConfetti } from '@neoconfetti/react';
import { useEffect } from 'react';

const CONFETTI_DURATION = 3500;
const CONFETTI_PARTICLE_COUNT = 150;

export function Confetti() {
  const { isActive, reset } = useConfettiStore();

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(reset, CONFETTI_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isActive, reset]);

  if (!isActive) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-start justify-center pt-[25vh]">
      <NeoConfetti
        particleCount={CONFETTI_PARTICLE_COUNT}
        duration={CONFETTI_DURATION}
        colors={['#a786ff', '#fd8bbc', '#eca184', '#f8deb1', '#60d394']}
      />
    </div>
  );
}
