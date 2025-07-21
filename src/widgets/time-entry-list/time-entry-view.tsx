'use client';

import { timeEntryApiHooks } from '@/entities/time-entry/api/time-entry-api-hooks';
import { TimeEntryDTO, TimeEntryPayload } from '@/entities/time-entry/model/types';
import { TimeEntryForm } from '@/entities/time-entry/ui/time-entry-form';
import { TimeEntryStartAgainButton } from '@/features/time-entry-start-again/ui/time-entry-start-again-button';
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

export interface TimeEntryViewProps {
  entry: TimeEntryDTO;
  trigger: React.ReactNode;
}

export function TimeEntryView({ entry, trigger }: TimeEntryViewProps) {
  const [open, setOpen] = useState(false);
  const duration = useDuration(entry?.start_time, entry?.end_time);

  const timeEntryUpdate = timeEntryApiHooks.useUpdate();

  const handleSubmit = (data: TimeEntryPayload) => {
    if (entry) {
      timeEntryUpdate.mutate(
        {
          id: entry.documentId,
          data: data,
        },
        {
          onSuccess: () => {
            toast.success('Информация успешно обновлена');
            setOpen(false);
          },
          onError: () => {
            toast.error('Не удалось изменить информацию о треке времени');
          },
        },
      );
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
          <TimeEntryStartAgainButton entry={entry} />
        </DrawerHeader>
        {entry && <TimeEntryForm className="px-4" onSubmit={handleSubmit} defaultValues={entry} />}
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Закрыть</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
