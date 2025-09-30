import { ProjectDTO } from '@/entities/project/models/types';
import { TaskDTO } from '@/entities/task/model/task-types';
import { ApiEntityBase } from '@/shared/types/api';

export interface TimeEntryDTO extends Omit<ApiEntityBase, 'publishedAt'> {
  description: string | null;
  start_time: string;
  end_time: string | null;
  user?: string | null;
  project?: ProjectDTO;
  duration?: number;
  task?: TaskDTO;
}

export interface TimeEntryPayload {
  description?: string;
  project?: string | null;
  start_time?: string | Date;
  end_time?: string | Date;
  task?: string;
}

export interface TimeEntry extends TimeEntryDTO {
  isPending?: boolean;
}
