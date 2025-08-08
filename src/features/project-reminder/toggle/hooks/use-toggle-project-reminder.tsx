import { projectReminderApiHooks } from '@/entities/project-reminder/api/project-reminder-api-hooks';
import { Bell, BellOff } from 'lucide-react';
import { toast } from 'sonner';

export function useToggleProjectReminder() {
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

  return toggleReminder;
}
