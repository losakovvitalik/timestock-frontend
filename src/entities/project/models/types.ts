import { ApiEntityBase } from '@/shared/types/api';
import { Color } from '@/shared/ui/color-picker';

export interface Project extends ApiEntityBase {
  name: string;
  color: Color;
  description?: string;
}

export interface ProjectPayload {
  name: string;
  color: string;
  description?: string;
}
