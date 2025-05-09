import { createApiEndpoint } from '@/shared/api/create-api-endpoint';
import { ApiCollectionResponse, ApiGetParams } from '@/shared/types/api';
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';

type Id = string | number;

export function createApiHooks<Entity extends Record<any, any>, Payload = Partial<Entity>>(
  entityName: string,
  basePath: string,
) {
  const api = createApiEndpoint<Entity, Payload>(basePath);

  const useGet = (
    id: Id,
    options?: Omit<UseQueryOptions<{ data: Entity }>, 'queryKey' | 'queryFn'>,
  ) =>
    useQuery({
      queryKey: [entityName, id],
      queryFn: () => api.get(id.toString()),
      enabled: !!id,
      ...options,
    });

  const useList = <TData = ApiCollectionResponse<Entity>>(
    params?: ApiGetParams<Entity>,
    options?: Omit<
      UseQueryOptions<ApiCollectionResponse<Entity>, unknown, TData>,
      'queryKey' | 'queryFn'
    >,
  ) =>
    useQuery<ApiCollectionResponse<Entity>, unknown, TData>({
      queryKey: [entityName, 'list', params],
      queryFn: () => api.list(params),
      ...options,
    });

  const useCreate = (config?: {
    onMutate?: (data: Payload) => any;
    onSuccess?: () => void;
    onError?: (err: unknown) => void;
  }) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (data: Payload) => api.create(data),
      onMutate: config?.onMutate,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [entityName, 'list'] });
        config?.onSuccess?.();
      },
      onError: config?.onError,
    });
  };

  const useUpdate = (config?: {
    onMutate?: (data: { id: Id; data: Payload }) => any;
    onSuccess?: () => void;
    onError?: (err: unknown) => void;
  }) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ id, data }: { id: Id; data: Payload }) => api.update(id.toString(), data),
      onMutate: config?.onMutate,
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: [entityName, 'list'] });
        queryClient.invalidateQueries({ queryKey: [entityName, variables.id] });
        config?.onSuccess?.();
      },
      onError: config?.onError,
    });
  };

  const useDelete = (config?: {
    onMutate?: (id: Id) => any;
    onSuccess?: () => void;
    onError?: (err: unknown) => void;
  }) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (id: Id) => api.delete(id.toString()),
      onMutate: config?.onMutate,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [entityName + 'List'] });
        config?.onSuccess?.();
      },
      onError: config?.onError,
    });
  };

  return {
    useGet,
    useList,
    useCreate,
    useUpdate,
    useDelete,
  };
}
