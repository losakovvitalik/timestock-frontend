import { projectReminderApiHooks } from '@/entities/project-reminder/api/project-reminder-api-hooks';
import { INTERVAL_OPTIONS } from '@/entities/project-reminder/model/constants';
import { ProjectReminder } from '@/entities/project-reminder/model/types';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Switch } from '@/shared/ui/switch';
import { Bell, BellOff, Edit } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatReminderDate } from '../../entities/project-reminder/utils/format-reminder-date';

export interface ProjectReminderListItemProps {
  item: ProjectReminder;
}

export function ProjectReminderListItem({ item }: ProjectReminderListItemProps) {
  const update = projectReminderApiHooks.useUpdate();

  const toggleReminder = async (reminderId: string, enabled: boolean) => {
    return await update.mutateAsync(
      {
        id: reminderId,
        data: {
          enabled,
        },
      },
      {
        onSuccess(_, variables) {
          return variables.data.enabled
            ? toast('Уведомление включено', {
                icon: <Bell className="text-green-300" />,
              })
            : toast('Уведомление выключено', {
                icon: <BellOff className="text-red-300" />,
              });
        },
      },
    );
  };

  return (
    <Card>
      <CardContent>
        <div className="flex justify-between gap-2">
          <div>
            <div className="text-lg font-semibold">
              {
                INTERVAL_OPTIONS.find(({ value }) => value === item.recurrence_options.interval)
                  ?.label
              }{' '}
              в {item.recurrence_options.time}
            </div>
            <div className="text-foreground/40 text-xs">
              Следующее напоминание: {formatReminderDate(item.next_at)}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button size="icon" variant={'outline'}>
              <Edit />
            </Button>
            <Switch
              disabled={update.isPending}
              defaultChecked={item.enabled}
              onCheckedChange={(checked) => toggleReminder(item.documentId, checked)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
