import { cn } from '@/shared/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { PropsWithChildren } from 'react';

const typographyVariants = cva('', {
  variants: {
    size: {
      tiny: 'text-tiny',
      xs: 'text-xs',
      sm: 'text-sm',
      lg: 'text-lg',
      default: 'text-base',
    },
    variant: {
      important: 'text-lg font-medium',
      subtitle: 'text-xl font-bold',
      muted: 'text-muted-foreground',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface TypographyProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof typographyVariants>,
    PropsWithChildren {
  asChild?: boolean;
}

function Typography({ asChild, className, size, variant, ...props }: TypographyProps) {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      className={cn(
        typographyVariants({
          className,
          size,
          variant,
        }),
      )}
      {...props}
    />
  );
}

export { Typography };
