import { cn } from '@/shared/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { PropsWithChildren } from 'react';

const typographyVariants = cva('', {
  variants: {
    size: {
      default: 'text-base',
      xs: 'text-xs',
      sm: 'text-sm',
    },
    variant: {
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
