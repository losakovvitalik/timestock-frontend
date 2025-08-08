import {
  ProjectReminderDTO,
  ProjectReminderPayload,
} from '@/entities/project-reminder/model/types';
import { ProjectDTO, ProjectPayload } from '@/entities/project/models/types';
import {
  PushSubscriptionDTO,
  PushSubscriptionPayload,
} from '@/entities/push-subscription/models/types';
import { TimeEntryDTO, TimeEntryPayload } from '@/entities/time-entry/model/types';

export interface EntityDef<TDTO = unknown, TPayload = unknown> {
  key: string;
  path: string;
  dto: TDTO;
  payload: TPayload;
}

// Собираем все сущности в один объект
export const entities = {
  project: {
    key: 'project',
    path: '/projects',
  } as EntityDef<ProjectDTO, ProjectPayload>,

  projectReminder: {
    key: 'project-reminder',
    path: '/project-reminders',
  } as EntityDef<ProjectReminderDTO, ProjectReminderPayload>,

  pushSubscription: {
    key: 'push-subscription',
    path: '/push-subscriptions',
  } as EntityDef<PushSubscriptionDTO, PushSubscriptionPayload>,

  timeEntry: {
    key: 'time-entry',
    path: '/time-entries',
  } as EntityDef<TimeEntryDTO, TimeEntryPayload>,
} as const;
