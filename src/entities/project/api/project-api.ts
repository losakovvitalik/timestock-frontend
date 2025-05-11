import { createApiEndpoint } from '@/shared/api/create-api-endpoint';
import { Project, ProjectPayload } from '../models/types';

export const projectApi = createApiEndpoint<Project, ProjectPayload>('/time-entries');
