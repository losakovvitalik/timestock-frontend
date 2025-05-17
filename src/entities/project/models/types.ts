import { User } from '@/entities/user/model/types';
import { ApiEntityBase } from '@/shared/types/api';
import { Color } from '@/shared/ui/color-picker';

export interface Project extends ApiEntityBase {
  name: string;
  color: Color;
  description?: string;
  user?: User;
}

export interface ProjectPayload {
  name: string;
  color: string;
  description?: string;
}
