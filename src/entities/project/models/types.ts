import { User } from '@/entities/user/model/types';
import { ApiEntityBase } from '@/shared/types/api';

export interface Project extends ApiEntityBase {
  name: string;
  color: Color;
  description?: string | null;
  user?: User;
}

export interface Color extends ApiEntityBase {
  hex?: string;
}

export interface ProjectPayload {
  name: string;
  color: string;
  description?: string;
}
