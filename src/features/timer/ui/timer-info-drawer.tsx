'use client';

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
import { TimerInfoForm } from './timer-form';

export function TimerInfoDrawer() {
  const activeTimeEntry = useActiveTimeEntry();
  const duration = useDuration(activeTimeEntry.data?.start_time);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="flex gap-1 rounded-full">
          <Plus />
          <Typography>Добавить информацию</Typography>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Информация</DrawerTitle>
          <DrawerDescription>{duration}</DrawerDescription>
        </DrawerHeader>
          <TimerInfoForm className='px-4' />
        <DrawerFooter>
          <Button>Добавить информацию</Button>
          <DrawerClose asChild>
            <Button variant="outline">Отменить</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
