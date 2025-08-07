import { ProjectDTO } from '@/entities/project/models/types';
import { ApiEntityBase } from '@/shared/types/api';

export interface TimeEntryDTO extends Omit<ApiEntityBase, 'publishedAt'> {
  description: string | null;
  start_time: string;
  end_time: string | null;
  user?: string | null;
  project?: ProjectDTO;
  duration?: number;
}

export interface TimeEntryPayload {
  description?: string;
  project?: string | null;
  start_time?: string | Date;
  end_time?: string | Date;
}
