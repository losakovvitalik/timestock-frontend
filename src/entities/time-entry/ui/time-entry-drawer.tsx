'use client';

import { useDuration } from '@/shared/hooks/use-duration';
import { Button } from '@/shared/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/drawer';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { TimerToggleButton } from '../../../features/timer/ui/timer-toggle-button';
import { timeEntryApiHooks } from '../api/time-entry-api-hooks';
import { TimeEntryFormSchemaType } from '../model/time-entry-form-schema';
import { TimeEntry } from '../model/types';
import { TimeEntryForm } from './time-entry-form';

export interface TimeEntryDrawerProps {
  entry: TimeEntry;
  trigger: React.ReactNode;
}

export function TimeEntryDrawer({ entry, trigger }: TimeEntryDrawerProps) {
  const [open, setOpen] = useState(false);

  const duration = useDuration(entry?.start_time, entry?.end_time);

  const timeEntryUpdate = timeEntryApiHooks.useUpdate({
    onSuccess: () => {
      toast.success('Информация успешно обновлена');
      setOpen(false);
    },
  });

  const handleSubmit = (data: TimeEntryFormSchemaType) => {
    if (entry) {
      timeEntryUpdate.mutate({
        id: entry.documentId,
        data: {
          ...data,
        },
      });
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex-row justify-between">
          <div>
            <DrawerTitle>Информация</DrawerTitle>
            <DrawerDescription>{duration}</DrawerDescription>
          </div>
          <TimerToggleButton className="size-11 !p-0.5" />
        </DrawerHeader>
        {entry && (
          <TimeEntryForm
            className="px-4"
            onSubmit={handleSubmit}
            defaultValues={{
              description: entry?.description || undefined,
              project: entry?.project?.documentId,
            }}
          />
        )}
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Закрыть</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
