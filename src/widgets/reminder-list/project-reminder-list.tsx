'use client';

import { projectReminderApiHooks } from '@/entities/project-reminder/api/project-reminder-api-hooks';
import { CreateProjectReminderDialog } from '../../features/create-reminder/ui/create-project-reminder-dialog';
import { ProjectReminderListItem } from './project-reminder-list-item';

export interface ReminderListProps {
  projectId: string;
}

export function ProjectReminderList({ projectId }: ReminderListProps) {
  const { data: reminders } = projectReminderApiHooks.useList({
    params: {
      filters: {
        project: {
          documentId: projectId,
        },
      },
    },
  });

  if (!reminders) {
    return null;
  }

  return (
    <div>
      <CreateProjectReminderDialog projectId={projectId} />

      <ul className="mt-2">
        {reminders?.data.map((item) => (
          <li key={item.documentId}>
            <ProjectReminderListItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
