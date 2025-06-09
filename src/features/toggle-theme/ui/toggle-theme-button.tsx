'use client';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface ToggleThemeButtonProps {
  className?: string;
}

const ToggleThemeButton = ({ className }: ToggleThemeButtonProps) => {
  const { resolvedTheme: theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      className={cn('flex cursor-pointer items-center gap-1', className)}
      onClick={toggleTheme}
    >
      {theme === 'dark' ? <Sun /> : <Moon />} Включить {theme === 'dark' ? 'светлую' : 'темную'}{' '}
      тему
    </Button>
  );
};

export default ToggleThemeButton;
