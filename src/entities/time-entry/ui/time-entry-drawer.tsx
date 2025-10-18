'use client';

import { TimeEntryDTO, TimeEntryPayload } from '@/entities/time-entry/model/types';
import { TimeEntryForm } from '@/entities/time-entry/ui/time-entry-form';
import { ResponsiveModal } from '@/shared/ui/responsive-modal';

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
    <ResponsiveModal open={open} setOpen={onOpenChange} trigger={trigger} title="Информация">
      <TimeEntryForm className="lg:py-4" onSubmit={onSubmit} defaultValues={entry} />
    </ResponsiveModal>
  );
}
