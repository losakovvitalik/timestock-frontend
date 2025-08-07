import { createApiEndpoint } from '@/shared/api/create-api-endpoint';
import { ProjectDTO, ProjectPayload } from '../models/types';

export const projectApi = createApiEndpoint<ProjectDTO, ProjectPayload>('/projects');
