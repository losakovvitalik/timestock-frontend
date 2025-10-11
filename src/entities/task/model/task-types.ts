import { ProjectDTO } from '@/entities/project/models/types';
import { TimeEntryDTO } from '@/entities/time-entry/model/types';
import { UserDTO } from '@/entities/user/model/types';
import { ApiEntityBase } from '@/shared/types/api';

export interface TaskDTO extends ApiEntityBase {
  name: string;
  estimated_time?: number;
  time_spent?: number;
  project?: ProjectDTO;
  description?: string;
  author?: UserDTO;
  time_entries?: TimeEntryDTO[];
  is_completed: boolean;
  is_archived: boolean;
  due_date?: string;
}

export interface TaskPayload
  extends Pick<TaskDTO, 'name' | 'description' | 'estimated_time' | 'time_spent' | 'is_completed'> {
  project?: string;
}
