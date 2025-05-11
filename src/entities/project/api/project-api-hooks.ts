import { createApiHooks } from '@/shared/lib/react-query/create-api-hooks';
import { Project, ProjectPayload } from '../models/types';

export const projectApiHooks = createApiHooks<Project, ProjectPayload>('project', '/projects');
