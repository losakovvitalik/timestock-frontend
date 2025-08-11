import { Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

export interface LoaderProps {
  className?: string;
  absolute?: boolean;
}

export function Loader({ className, absolute }: LoaderProps) {
  return (
    <div className="flex items-center justify-center">
      <Loader2
        className={cn(
          'size-16 animate-spin',
          {
            'absolute top-1/2 left-1/2 z-10 -translate-1/2': absolute,
          },
          className,
        )}
      />
    </div>
  );
}
