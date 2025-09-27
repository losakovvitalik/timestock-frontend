import { timeEntryApiHooks } from '@/entities/time-entry/api/time-entry-api-hooks';
import { TimeEntry, TimeEntryPayload } from '@/entities/time-entry/model/types';
import { TimeEntryDrawer } from '@/entities/time-entry/ui/time-entry-drawer';
import { TimeEntryDeleteButton } from '@/features/time-entry-delete/ui/time-entry-delete-button';
import { TimeEntryDeletePopup } from '@/features/time-entry-delete/ui/time-entry-delete-popup';
import { useTimeEntryStartAgain } from '@/features/time-entry-start-again/hooks/use-time-entry-start-again';
import { TimeEntryStartAgainButton } from '@/features/time-entry-start-again/ui/time-entry-start-again-button';
import { useIsDesktop } from '@/shared/hooks/use-media-query';
import { formatDisplayDate } from '@/shared/lib/date/format-display-date';
import { cn } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardTitle } from '@/shared/ui/card';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/shared/ui/context-menu';
import { Loader } from '@/shared/ui/loader';
import { Typography } from '@/shared/ui/typography';
import { formatDuration } from '@/shared/utils/duration';
import { animate, motion, useMotionValue, useTransform } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useTimeEntryList } from './model/time-entry-list.store';

export interface TimeEntryItemProps {
  entry: TimeEntry;
}

const ACTION_WIDTH = 54;
const OPEN_THRESHOLD = 0.5; // % от ACTION_WIDTH для фиксации «открыто»

export function TimeEntryItem({ entry }: TimeEntryItemProps) {
  const isDesktop = useIsDesktop();

  const startAgain = useTimeEntryStartAgain({
    entry,
  });

  const x = useMotionValue(0);
  const reveal = useTransform(x, [0, -ACTION_WIDTH], [0, 1]); // 0..1
  const actionsOpacity = useTransform(reveal, [0, 1], [0, 1]);
  const actionsScale = useTransform(reveal, [0, 1], [0.95, 1]);

  const open = useTimeEntryList((s) => s.open);
  const close = useTimeEntryList((s) => s.close);
  const closeAll = useTimeEntryList((s) => s.closeAll);
  const isOpen = useTimeEntryList((s) => s.openId === entry.documentId);

  const snapTo = useCallback(
    (target: number) => {
      animate(x, target, { type: 'spring', stiffness: 600, damping: 40 });
    },
    [x],
  );

  const timeEntryUpdate = timeEntryApiHooks.useUpdate();
  const [drawerOpen, setDrawerOpen] = useState(false);
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
            setDrawerOpen(false);
          },
          onError: () => {
            toast.error('Не удалось изменить информацию о треке времени');
          },
        },
      );
    }
  };

  useEffect(() => {
    snapTo(isOpen ? -ACTION_WIDTH : 0);
  }, [isOpen, x, snapTo]);

  useEffect(
    () => () => {
      if (isOpen) close(entry.documentId);
    },
    [isOpen, close, entry.documentId],
  );

  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="relative overflow-hidden">
      <ContextMenu>
        <ContextMenuTrigger>
          <motion.div
            className="relative z-10 will-change-transform"
            style={{ x, touchAction: 'pan-y' }}
            drag={isDesktop ? false : 'x'}
            dragDirectionLock
            dragElastic={0.1}
            dragMomentum={false}
            dragConstraints={{ left: -(ACTION_WIDTH + 40), right: 0 }}
            onDragStart={() => {
              closeAll();
            }}
            onDragEnd={(_, info) => {
              const current = x.get();

              if (current > 0) {
                snapTo(0);
                close(entry.documentId);
                return;
              }

              const shouldOpen =
                Math.abs(current) > (ACTION_WIDTH + 40) * OPEN_THRESHOLD || info.velocity.x < -300;

              if (shouldOpen) {
                open(entry.documentId);
              } else {
                close(entry.documentId);
                snapTo(0);
              }
            }}
          >
            <Card className={cn('border-none p-3 px-2')}>
              <CardContent className="grid grid-cols-[1fr_auto] items-center gap-4 px-2">
                <TimeEntryDrawer
                  onSubmit={handleSubmit}
                  onOpenChange={setDrawerOpen}
                  open={drawerOpen}
                  entry={entry}
                  trigger={
                    <button className="flex cursor-pointer flex-col items-start gap-1">
                      <CardTitle
                        className={cn('line-clamp-1 text-left leading-5', {
                          'opacity-70': !entry.description,
                        })}
                      >
                        {entry.description || 'Без описания'}
                      </CardTitle>
                      <div className="flex items-center gap-1">
                        <Typography className="text-sm font-semibold">
                          {formatDuration(entry.duration || 0)}
                        </Typography>
                        {entry.project?.name && (
                          <Badge variant={'secondary'}>
                            {entry.project && (
                              <div
                                className="size-2.5 rounded-full"
                                style={{
                                  backgroundColor: entry.project.color.hex,
                                }}
                              />
                            )}
                            <Typography size={'xs'}>
                              {entry.project?.name || 'Проект не указан'}
                            </Typography>
                          </Badge>
                        )}
                        <Badge variant={'secondary'}>
                          <Typography size={'xs'}>{formatDisplayDate(entry.start_time)}</Typography>
                        </Badge>
                      </div>
                    </button>
                  }
                />
                {entry.isPending ? (
                  <Loader className="size-8" />
                ) : (
                  <div className="flex gap-2">
                    <TimeEntryStartAgainButton entry={entry} />
                    <TimeEntryDeleteButton className="hidden md:flex" entry={entry} />
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onSelect={() => startAgain.mutate()}>Продолжить</ContextMenuItem>
          <ContextMenuItem>Дублировать</ContextMenuItem>
          <ContextMenuItem onSelect={() => setDeleteOpen(true)} className="text-destructive">
            Удалить
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <TimeEntryDeletePopup entry={entry} open={deleteOpen} onOpenChange={setDeleteOpen} />

      <div className="absolute inset-y-0 right-0 flex items-stretch pr-2">
        <motion.div
          style={{ opacity: actionsOpacity, scale: actionsScale }}
          className="flex items-center"
          aria-hidden
        >
          <TimeEntryDeleteButton entry={entry} />
        </motion.div>
      </div>
    </div>
  );
}
