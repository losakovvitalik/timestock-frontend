import { createApiEndpoint } from '@/shared/api/create-api-endpoint';
import { ApiCollectionResponse, ApiGetParams } from '@/shared/types/api';
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';

type Id = string | number;

type ReturnTypeInternal<EntityDTO, Payload, Entity = EntityDTO> = {
  useGet: (
    id: Id,
    props: {
      options?: Omit<UseQueryOptions<Entity>, 'queryKey' | 'queryFn'>;
      params?: ApiGetParams<EntityDTO>;
    },
  ) => ReturnType<typeof useQuery<Entity>>;

  useList: <TData = ApiCollectionResponse<Entity>>(
    params?: ApiGetParams<EntityDTO>,
    options?: Omit<
      UseQueryOptions<ApiCollectionResponse<Entity>, unknown, TData>,
      'queryKey' | 'queryFn'
    >,
  ) => ReturnType<typeof useQuery<ApiCollectionResponse<Entity>, unknown, TData>>;

  useCreate: (config?: {
    onMutate?: (data: Payload) => any;
    onSuccess?: () => void;
    onError?: (err: unknown) => void;
  }) => ReturnType<typeof useMutation<Entity, unknown, Payload>>;

  useUpdate: (config?: {
    onMutate?: (data: { id: Id; data: Payload }) => any;
    onSuccess?: () => void;
    onError?: (err: unknown) => void;
  }) => ReturnType<typeof useMutation<Entity, unknown, { id: Id; data: Payload }>>;

  useDelete: (config?: {
    onMutate?: (id: Id) => any;
    onSuccess?: () => void;
    onError?: (err: unknown) => void;
  }) => ReturnType<typeof useMutation<void, unknown, Id>>;
};

// Без mapFn
export function createApiHooks<EntityDTO extends Record<any, any>, Payload = Partial<EntityDTO>>(
  entityName: string,
  basePath: string,
): ReturnTypeInternal<EntityDTO, Payload>;

// С mapFn
export function createApiHooks<
  EntityDTO extends Record<any, any>,
  Payload = Partial<EntityDTO>,
  Entity = Record<any, any>,
>(
  entityName: string,
  basePath: string,
  mapFn: (dto: EntityDTO) => Entity,
): ReturnTypeInternal<EntityDTO, Payload, Entity>;

export function createApiHooks<
  EntityDTO extends Record<any, any>,
  Payload = Partial<EntityDTO>,
  Entity = Record<any, any>,
>(
  entityName: string,
  basePath: string,
  mapFn?: (dto: EntityDTO) => Entity,
): ReturnTypeInternal<EntityDTO, Payload, Entity> {
  const api = mapFn
    ? createApiEndpoint<EntityDTO, Payload, Entity>(basePath, mapFn)
    : createApiEndpoint<EntityDTO, Payload>(basePath);

  const useGet = (
    id: Id,
    {
      options,
      params,
    }: {
      options?: Omit<UseQueryOptions<Entity>, 'queryKey' | 'queryFn'>;
      params?: ApiGetParams<EntityDTO>;
    } = {},
  ) =>
    useQuery({
      queryKey: [entityName, id],
      queryFn: () => api.get(id.toString(), params),
      enabled: !!id,
      ...options,
    });

  const useList = <TData = ApiCollectionResponse<Entity>>(
    params?: ApiGetParams<EntityDTO>,
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
        queryClient.invalidateQueries({ queryKey: [entityName, 'list'] });
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
