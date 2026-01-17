'use client';

import { timeEntryApiHooks } from '@/entities/time-entry/api/time-entry-api-hooks';
import { useActiveTimeEntry } from '@/entities/time-entry/hooks/use-active-time-entry';
import { TimeEntryPayload } from '@/entities/time-entry/model/types';
import { TimeEntryDrawer } from '@/entities/time-entry/ui/time-entry-drawer';
import { Button } from '@/shared/ui/button';
import { Plus } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { toast } from 'sonner';

export interface TimerDrawerProps {
  trigger?: ReactNode;
}

export function TimerDrawer({ trigger }: TimerDrawerProps) {
  const [open, setOpen] = useState(false);
  const { data: entry, refetch } = useActiveTimeEntry();

  const timeEntryUpdate = timeEntryApiHooks.useUpdate({
    onSuccess: () => {
      toast.success('Информация успешно обновлена');
      setOpen(false);
      refetch();
    },
  });

  const timeEntryCreate = timeEntryApiHooks.useCreate({
    onSuccess: () => {
      toast.success('Трек времени успешно добавлен');
      setOpen(false);
    },
  });

  const handleSubmit = (data: TimeEntryPayload) => {
    if (entry) {
      timeEntryUpdate.mutate({
        id: entry.documentId,
        data: data,
      });
    } else {
      timeEntryCreate.mutate(data);
    }
  };

  const defaultTrigger = (
    <Button
      variant="secondary"
      size="icon"
      className="size-10 rounded-full"
      title="Добавить информацию"
    >
      <Plus className="size-4" />
    </Button>
  );

  return (
    <TimeEntryDrawer
      entry={entry}
      open={open}
      onOpenChange={setOpen}
      onSubmit={handleSubmit}
      trigger={trigger ?? defaultTrigger}
    />
  );
}
