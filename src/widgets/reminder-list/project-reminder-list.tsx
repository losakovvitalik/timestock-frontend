'use client';

import { projectReminderApiHooks } from '@/entities/project-reminder/api/project-reminder-api-hooks';
import { CreateProjectReminderDialog } from '@/features/create-reminder/ui/create-project-reminder-dialog';
import { ProjectReminderListItem } from './project-reminder-list-item';

export interface ReminderListProps {
  projectId: string;
}

const projectReminderParams = (projectId: string) =>
  ({
    filters: {
      project: {
        documentId: projectId,
      },
    },
    sort: {
      enabled: 'desc',
    },
  }) as const;

export const projectReminderListQK = (projectId: string) =>
  projectReminderApiHooks.keys.list(projectReminderParams(projectId));

export function ProjectReminderList({ projectId }: ReminderListProps) {
  const { data: reminders } = projectReminderApiHooks.useList({
    params: projectReminderParams(projectId),
    options: {
      select: (data) => data.data,
    },
  });

  if (!reminders) {
    return null;
  }

  return (
    <div>
      <CreateProjectReminderDialog projectId={projectId} />

      <ul className="mt-2 flex flex-col gap-2">
        {reminders?.map((item) => (
          <li key={item.documentId}>
            <ProjectReminderListItem projectId={projectId} item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
