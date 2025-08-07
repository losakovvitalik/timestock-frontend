import { User } from '@/entities/user/model/types';
import { ApiEntityBase } from '@/shared/types/api';

export interface ProjectDTO extends ApiEntityBase {
  name: string;
  color: Color;
  description?: string | null;
  owner?: User;
  members?: User[];
  time_spent: number;
}

export interface Color extends ApiEntityBase {
  hex?: string;
}

export interface ProjectPayload {
  name: string;
  color: string;
  description?: string;
}
