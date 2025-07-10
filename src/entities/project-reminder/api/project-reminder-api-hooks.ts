import { createApiHooks } from '@/shared/lib/react-query/create-api-hooks';
import { ProjectReminder, ProjectReminderPayload } from '../model/types';

export const projectReminderApiHooks = createApiHooks<ProjectReminder, ProjectReminderPayload>(
  'project-reminder',
  '/project-reminders',
);
