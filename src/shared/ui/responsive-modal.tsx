import React from 'react';
import { useMediaQuery } from '../hooks/use-media-query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './drawer';

export interface ResponsiveModalProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  trigger?: React.ReactNode;
  open?: boolean;
  setOpen?: (val: boolean) => void;
}

export function ResponsiveModal({
  title,
  trigger,
  children,
  description,
  open: propOpen,
  setOpen: propSetOpen,
}: ResponsiveModalProps) {
  const [stateOpen, stateSetOpen] = React.useState(false);

  const isControlled = propOpen !== undefined;
  const open = isControlled ? propOpen : stateOpen;
  const setOpen = isControlled ? propSetOpen : stateSetOpen;

  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        <div className="px-4 pb-6">{children}</div>
      </DrawerContent>
    </Drawer>
  );
}
