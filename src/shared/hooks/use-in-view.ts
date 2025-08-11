import { useInView as useInViewMotion } from 'motion/react';
import { useEffect, useRef } from 'react';

export function useInView({ onInView }: { onInView: (val: boolean) => void }) {
  const ref = useRef(null);
  const rootRef = useRef(null);

  const isInView = useInViewMotion(ref, {
    root: rootRef,
    margin: '0px 0px 200px 0px',
  });

  useEffect(() => {
    if (isInView) {
      onInView(isInView);
    }
  }, [isInView]);

  return {
    ref,
    rootRef,
    isInView,
  };
}
