'use client';

import { timeEntryApiHooks } from '@/entities/time-entry/api/time-entry-api-hooks';
import { useActiveTimeEntry } from '@/entities/time-entry/hooks/use-active-time-entry';
import { TimeEntryPayload } from '@/entities/time-entry/model/types';
import { TimeEntryDrawer } from '@/entities/time-entry/ui/time-entry-drawer';
import { Button } from '@/shared/ui/button';
import { Typography } from '@/shared/ui/typography';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function TimerDrawer() {
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

  return (
    <TimeEntryDrawer
      entry={entry}
      open={open}
      onOpenChange={setOpen}
      onSubmit={handleSubmit}
      trigger={
        <Button className="flex gap-1 rounded-full" size={'sm'}>
          <Plus className="size-4 stroke-3" />
          <Typography size={'sm'}>Добавить информацию</Typography>
        </Button>
      }
    />
  );
}
