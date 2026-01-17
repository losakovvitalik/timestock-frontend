import { Clock } from 'lucide-react';

type LogoSize = 'sm' | 'md' | 'lg';

interface LogoProps {
  size?: LogoSize;
}

const sizeConfig: Record<LogoSize, { icon: string; padding: string }> = {
  sm: { icon: 'size-4', padding: 'p-1.5' },
  md: { icon: 'size-6', padding: 'p-3' },
  lg: { icon: 'size-9', padding: 'p-4' },
};

export function Logo({ size = 'md' }: LogoProps) {
  const { icon, padding } = sizeConfig[size];

  return (
    <div className={`bg-primary/10 rounded-full ${padding}`}>
      <Clock className={`text-primary ${icon}`} />
    </div>
  );
}
