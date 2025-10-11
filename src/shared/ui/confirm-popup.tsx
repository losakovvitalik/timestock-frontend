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
}

const ConfirmPopup = ({
  onCancel,
  onConfirm,
  onOpenChange,
  open,
  title,
  description,
  trigger,
}: ConfirmPopupProps) => {
  const triggerBtn = isValidElement(trigger) ? trigger : <button>{trigger}</button>;

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="w-11/12 rounded-lg">
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
