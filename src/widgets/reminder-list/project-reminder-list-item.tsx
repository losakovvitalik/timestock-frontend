import { projectReminderApiHooks } from '@/entities/project-reminder/api/project-reminder-api-hooks';
import { INTERVAL_OPTIONS } from '@/entities/project-reminder/model/constants';
import { ProjectReminderDTO } from '@/entities/project-reminder/model/types';
import { DeleteProjectReminderDialog } from '@/features/project-reminder/delete/ui/delete-project-reminder-dialog';
import { useToggleProjectReminder } from '@/features/project-reminder/toggle/hooks/use-toggle-project-reminder';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Switch } from '@/shared/ui/switch';
import { Edit } from 'lucide-react';
import { formatReminderDate } from '../../entities/project-reminder/utils/format-reminder-date';

export interface ProjectReminderListItemProps {
  item: ProjectReminderDTO;
}

export function ProjectReminderListItem({ item }: ProjectReminderListItemProps) {
  const update = projectReminderApiHooks.useUpdate();

  const toggleReminder = useToggleProjectReminder();

  return (
    <Card className={cn({ 'opacity-80': !item.enabled })}>
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
            <DeleteProjectReminderDialog projectReminder={item} />
            <Button size={'icon'} variant={'outline'}>
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
