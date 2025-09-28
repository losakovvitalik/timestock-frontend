import { $api } from '@/shared/lib/api';
import { ApiCollectionResponse } from '@/shared/types/api';
import { ProjectDTO } from '../models/types';

export interface ProjectGetAllParams {
  filters: Record<keyof ProjectDTO, any>;
}

export interface ProjectGetAllResponse extends ApiCollectionResponse<ProjectDTO> {}

export const projectGetAll = async (params?: ProjectGetAllParams) => {
  const res = await $api.get<ProjectGetAllResponse>('/projects', {
    params,
  });

  return res.data;
};
