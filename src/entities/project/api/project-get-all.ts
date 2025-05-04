import { $api } from '@/shared/lib/api';
import { ApiCollectionResponse } from '@/shared/types/api';
import { Data } from '@strapi/types';
import { Project } from '../models/types';

export interface ProjectGetALlParams {
  filters: Record<keyof Data.ContentType<'api::project.project'>, any>;
}

export interface ProjectGetAllResponse extends ApiCollectionResponse<Project> {}

export const projectGetAll = async (params?: ProjectGetALlParams) => {
  const res = await $api.get<ProjectGetAllResponse>('/projects', {
    params,
  });

  return res.data;
};
