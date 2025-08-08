import { createApiHooks } from '@/shared/lib/react-query/create-api-hooks';
import { ProjectReminderDTO, ProjectReminderPayload } from '../model/types';

export const projectReminderApiHooks = createApiHooks<ProjectReminderDTO, ProjectReminderPayload>(
  'project-reminder',
  '/project-reminders',
);
