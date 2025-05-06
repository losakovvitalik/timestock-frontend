import { ApiEntityBase } from '@/shared/types/api';

export interface Project extends ApiEntityBase {
  name: string;
  color: string;
  description?: string;
}
