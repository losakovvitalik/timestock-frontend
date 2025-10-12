import { $api } from '@/shared/api/base';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserPayload } from '../model/types';

type Id = string | number;

// пришлось писать для обновления пользователя отдельных хук,
// так как при обновлении пользователя, поля надо передавать напрямую, без оборачивания их в "data"
export function useUpdateUser(config?: {
  onMutate?: (data: { id: Id; data: Partial<UserPayload> }) => any;
  onSuccess?: () => void;
  onError?: (err: unknown) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: Id; data: Partial<UserPayload> }) =>
      $api.put(`/users/${id.toString()}`, data),
    onMutate: config?.onMutate,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['user', variables.id] });
      config?.onSuccess?.();
    },
    onError: config?.onError,
  });
}
