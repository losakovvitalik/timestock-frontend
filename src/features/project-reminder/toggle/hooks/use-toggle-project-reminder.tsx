import { projectReminderApiHooks } from '@/entities/project-reminder/api/project-reminder-api-hooks';
import { ProjectReminderDTO } from '@/entities/project-reminder/model/types';
import { ApiCollectionResponse } from '@/shared/types/api';
import { projectReminderListQK } from '@/widgets/reminder-list/project-reminder-list';
import { useQueryClient } from '@tanstack/react-query';
import { Bell, BellOff } from 'lucide-react';
import { toast } from 'sonner';

type ToggleCtx = { prev: ApiCollectionResponse<ProjectReminderDTO> | undefined };

export interface UseToggleProjectReminderOptions {
  projectId: string;
}

export function useToggleProjectReminder({ projectId }: UseToggleProjectReminderOptions) {
  const qc = useQueryClient();

  const update = projectReminderApiHooks.useUpdate({
    onMutate: (data) => {
      qc.cancelQueries({
        queryKey: projectReminderListQK(projectId),
        type: 'all',
      });

      const prev = qc.getQueryData<ApiCollectionResponse<ProjectReminderDTO>>(
        projectReminderListQK(projectId),
      );

      qc.setQueryData<ApiCollectionResponse<ProjectReminderDTO> | undefined>(
        projectReminderListQK(projectId),
        (old) => {
          if (!old) return old;

          return {
            ...old,
            data: old.data.map((r) =>
              r.documentId === data.id ? { ...r, enabled: data.data.enabled ?? r.enabled } : r,
            ),
          };
        },
      );

      return { prev };
    },
    onError: (err, _vars, ctx) => {
      console.log(err);
      const c = ctx as ToggleCtx | undefined;
      if (c?.prev) qc.setQueryData(projectReminderListQK(projectId), c.prev);
      toast('Не удалось обновить уведомление', { description: 'Попробуйте ещё раз' });
    },
    onSuccess: (_data, vars) => {
      const icon = vars.data.enabled ? (
        <Bell className="pr-1 text-green-300" />
      ) : (
        <BellOff className="pr-1 text-red-300" />
      );
      toast(vars.data.enabled ? 'Уведомление включено' : 'Уведомление выключено', { icon });
    },
  });

  const toggleReminder = async (reminderId: string, enabled: boolean) => {
    return await update.mutateAsync({
      id: reminderId,
      data: {
        enabled,
      },
    });
  };

  return {
    toggleReminder,
    isToggleReminderPending: update.isPending,
  };
}
