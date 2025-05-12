import { Project } from '@/entities/project/models/types';
import { ApiEntityBase } from '@/shared/types/api';

export interface TimeEntryDTO extends ApiEntityBase {
  description: string | null;
  start_time: string;
  end_time: string | null;
  user?: string | null;
  project?: Project;
}

export interface TimeEntryPayload {
  description?: string;
  project?: string;
  start_time?: string | Date;
  end_time?: string | Date;
}
