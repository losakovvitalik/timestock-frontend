import { ProjectDTO } from '@/entities/project/models/types';

interface RecurrenceOptions {
  time: string; // формат "HH:mm"
  interval: 'DAILY';
}

export interface ProjectReminder {
  id: number;
  documentId: string;
  text: string;
  recurrence_options: RecurrenceOptions;
  next_at: string; // ISO 8601 дата-время
  enabled: boolean;
  createdAt: string; // ISO 8601 дата-время
  updatedAt: string; // ISO 8601 дата-время
  publishedAt: string; // ISO 8601 дата-время
  locale: string | null;
  project: ProjectDTO;
}

export interface ProjectReminderPayload {
  text?: string;
  project: string;
  enabled?: boolean;
  recurrence_options: RecurrenceOptions;
}
