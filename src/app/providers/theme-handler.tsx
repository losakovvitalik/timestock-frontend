'use client';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';

const ThemeHandler = ({ children }: PropsWithChildren) => {
  const { resolvedTheme } = useTheme();
  // const page = useLayoutStore((state) => state.page);
  const pathname = usePathname();

  useEffect(() => {
    let themeColorMeta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;

    if (!themeColorMeta) {
      themeColorMeta = document.createElement('meta');
      themeColorMeta.name = 'theme-color';
      document.head.appendChild(themeColorMeta);
    }

    // const light = page ? 'oklch(0.97 0 0)' : '#fff';
    themeColorMeta.content = resolvedTheme === 'dark' ? 'oklch(0.141 0.005 285.823)' : '#fff';
  }, [resolvedTheme, pathname]);

  return children;
};

export default ThemeHandler;
