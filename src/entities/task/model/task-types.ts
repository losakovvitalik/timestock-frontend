import { ProjectDTO } from '@/entities/project/models/types';
import { TimeEntryDTO } from '@/entities/time-entry/model/types';
import { UserDTO } from '@/entities/user/model/types';

export interface TaskDTO {
  name: string;
  estimated_time?: number;
  time_spent: number;
  project?: ProjectDTO;
  description?: string;
  author?: UserDTO;
  time_entries?: TimeEntryDTO[];
  completed: boolean;
}

export interface TaskPayload extends Omit<TaskDTO, 'project' | 'time_spent'> {
  project?: string;
}
