'use client';

import { timeEntryApiHooks } from '@/entities/time-entry/api/time-entry-api-hooks';
import { useActiveTimeEntry } from '@/entities/time-entry/hooks/use-active-time-entry';
import { TimeEntryDTO, TimeEntryPayload } from '@/entities/time-entry/model/types';
import { TimeEntryForm } from '@/entities/time-entry/ui/time-entry-form';
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
import { Typography } from '@/shared/ui/typography';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { TimerToggleButton } from '../../../features/timer/ui/timer-toggle-button';

export function TimerInfoDrawer() {
  const [open, setOpen] = useState(false);

  const { data: entry } = useActiveTimeEntry();

  const timeEntryUpdate = timeEntryApiHooks.useUpdate({
    onSuccess: () => {
      toast.success('Информация успешно обновлена');
      setOpen(false);
    },
  });

  const timeEntryCreate = timeEntryApiHooks.useCreate({
    onSuccess: () => {
      toast.success('Трек времени успешно добавлен');
      setOpen(false);
    },
  });

  const handleSubmit = (data: TimeEntryPayload) => {
    console.log(data);
    if (entry) {
      timeEntryUpdate.mutate({
        id: entry.documentId,
        data: data,
      });
    } else {
      timeEntryCreate.mutate(data);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="flex gap-1 rounded-full" size={'sm'}>
          <Plus className="size-4 stroke-3" />
          <Typography size={'sm'}>Добавить информацию</Typography>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex-row justify-between">
          <TimerInfoDrawerDuration entry={entry} />
          <TimerToggleButton className="size-11 !p-0.5" />
        </DrawerHeader>
        <TimeEntryForm className="px-4" onSubmit={handleSubmit} defaultValues={entry} />
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Отменить</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
function TimerInfoDrawerDuration({ entry }: { entry?: TimeEntryDTO }) {
  const duration = useDuration(entry?.start_time, entry?.end_time);

  return (
    <div>
      <DrawerTitle>Информация</DrawerTitle>
      <DrawerDescription>{duration}</DrawerDescription>
    </div>
  );
}
