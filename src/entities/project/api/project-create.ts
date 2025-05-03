import { $api } from '@/shared/lib/api';

export interface ProjectCreatePayload {
  name: string;
  description?: string;
}

export interface ProjectCreateResponse {}

export const projectCreate = async (data: ProjectCreatePayload) => {
  const res = await $api.post<ProjectCreateResponse>('/projects', { data });
  return res.data;
};