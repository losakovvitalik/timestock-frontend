import { cn } from '@/shared/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { DialogClose } from '@radix-ui/react-dialog';
import { isValidElement } from 'react';
import { Button } from './button';

export interface ConfirmPopupProps {
  onCancel?: () => void;
  onConfirm?: () => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  title: string;
  description?: React.ReactNode;
  trigger?: React.ReactNode;
  className?: string;
}

const ConfirmPopup = ({
  onCancel,
  onConfirm,
  onOpenChange,
  open,
  title,
  description,
  trigger,
  className,
}: ConfirmPopupProps) => {
  const triggerBtn = isValidElement(trigger) ? trigger : <button>{trigger}</button>;

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className={cn('w-11/12 rounded-lg md:max-w-md', className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="grid grid-cols-2">
          <DialogClose asChild>
            <Button onClick={onCancel} variant="outline">
              Отменить
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={onConfirm}>Подтвердить</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
      {trigger && <DialogTrigger asChild>{triggerBtn}</DialogTrigger>}
    </Dialog>
  );
};

export default ConfirmPopup;
