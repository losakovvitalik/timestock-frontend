import { entities } from '@/shared/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { archiveTask } from '../api/archive-task';

export function useArchiveTask(config?: {
  onSuccess?: () => void;
  onError?: (err: unknown) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (documentId: string) => archiveTask(documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [entities.task.key] });
      config?.onSuccess?.();
    },
    onError: config?.onError,
  });
}
