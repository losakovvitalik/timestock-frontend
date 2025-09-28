import { entities } from '@/shared/api/entities';
import { createApiHooks } from '@/shared/lib/react-query/create-api-hooks';

export const taskApiHooks = createApiHooks<typeof entities.task.dto, typeof entities.task.payload>(
  entities.task.key,
  entities.task.path,
);
