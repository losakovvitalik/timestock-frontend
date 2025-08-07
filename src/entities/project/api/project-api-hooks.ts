import { createApiHooks } from '@/shared/lib/react-query/create-api-hooks';
import { ProjectDTO, ProjectPayload } from '../models/types';

export const projectApiHooks = createApiHooks<ProjectDTO, ProjectPayload>('project', '/projects');
