'use client';

import { TimeEntryDTO, TimeEntryPayload } from '@/entities/time-entry/model/types';
import { TimeEntryForm } from '@/entities/time-entry/ui/time-entry-form';
import { TimeEntryStartAgainButton } from '@/features/time-entry-start-again/ui/time-entry-start-again-button';
import { Button } from '@/shared/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/drawer';
import { TimeEntryDuration } from './time-entry-duration';

export interface TimeEntryDrawerProps {
  entry?: TimeEntryDTO;
  trigger: React.ReactNode;
  onSubmit?: (data: TimeEntryPayload) => void;
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
}

export function TimeEntryDrawer({
  entry,
  trigger,
  onSubmit,
  open,
  onOpenChange,
}: TimeEntryDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex-row justify-between">
          <div>
            <DrawerTitle>Информация</DrawerTitle>
            {!entry?.end_time && <TimeEntryDuration entry={entry} />}
          </div>
          {entry && <TimeEntryStartAgainButton entry={entry} />}
        </DrawerHeader>
        <TimeEntryForm className="px-4" onSubmit={onSubmit} defaultValues={entry} />
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Закрыть</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
