'use client';
import { useEffect } from 'react';
import useLayoutStore from '../stores/use-layout-store';

const usePageTitle = (title: React.ReactNode | null) => {
  const setTitle = useLayoutStore((state) => state.setTitle);

  useEffect(() => {
    setTitle(title);
    return () => setTitle(null);
  }, [title, setTitle]);
};

export default usePageTitle;
