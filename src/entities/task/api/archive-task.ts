import { $api } from '@/shared/api';

export const archiveTask = (documentId: string) => {
  return $api.patch(`/tasks/${documentId}/archive`);
};
