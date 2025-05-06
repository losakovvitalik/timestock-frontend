'use client';

import { timeEntryApiHooks } from '@/entities/time-entry/api/time-entry-api-hooks';
import { useActiveTimeEntry } from '@/entities/time-entry/hooks/use-active-time-entry';
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
import { TimerFormSchemaType } from '../model/timer-form-schema';
import { TimerInfoForm } from './timer-form';
import { TimerToggleButton } from './timer-toggle-button';

export function TimerInfoDrawer() {
  const [open, setOpen] = useState(false);

  const { data: activeTimeEntryData } = useActiveTimeEntry();

  const duration = useDuration(activeTimeEntryData?.start_time);

  const timeEntryUpdate = timeEntryApiHooks.useUpdate({
    onSuccess: () => {
      toast.success('Информация успешно обновлена');
      setOpen(false);
    },
  });

  const handleSubmit = (data: TimerFormSchemaType) => {
    if (activeTimeEntryData) {
      timeEntryUpdate.mutate({
        id: activeTimeEntryData.documentId,
        data: {
          ...data,
        },
      });
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="flex gap-1 rounded-full">
          <Plus className='stroke-3' />
          <Typography>Добавить информацию</Typography>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex-row justify-between">
          <div>
            <DrawerTitle>Информация</DrawerTitle>
            <DrawerDescription>{duration}</DrawerDescription>
          </div>
          <TimerToggleButton className="size-11 !p-0.5" />
        </DrawerHeader>
        {activeTimeEntryData && (
          <TimerInfoForm
            className="px-4"
            onSubmit={handleSubmit}
            defaultValues={{
              description: activeTimeEntryData?.description || undefined,
              project: activeTimeEntryData?.project?.documentId,
            }}
          />
        )}
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Отменить</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
