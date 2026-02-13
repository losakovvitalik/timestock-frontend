'use client';
import { cn } from '@/shared/lib';
import { Switch } from '@/shared/ui/switch';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface ToggleThemeButtonProps {
  className?: string;
}

const ToggleThemeSwitch = ({ className }: ToggleThemeButtonProps) => {
  const { resolvedTheme: theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <label className={cn('flex cursor-pointer items-center justify-between gap-2', className)}>
      <span className="flex items-center gap-1">
        {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        Тёмная тема
      </span>
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
      />
    </label>
  );
};

export default ToggleThemeSwitch;
