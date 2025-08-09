import { createApiEndpoint } from '@/shared/api/create-api-endpoint';
import { ApiCollectionResponse, ApiErrorPayload, ApiGetParams } from '@/shared/types/api';
import { normalize } from '@/shared/utils/normalize';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

type Id = string;

type UseListProps<EntityDTO, Entity = EntityDTO, TData = ApiCollectionResponse<Entity>> = {
  params?: ApiGetParams<EntityDTO>;
  options?: Omit<
    UseQueryOptions<ApiCollectionResponse<Entity>, unknown, TData>,
    'queryKey' | 'queryFn'
  > & { queryKey?: string[] };
};

type ReturnTypeInternal<EntityDTO, Payload, Entity = EntityDTO> = {
  useGet: (
    id: Id,
    props?: {
      options?: Omit<UseQueryOptions<Entity>, 'queryKey' | 'queryFn'>;
      params?: ApiGetParams<EntityDTO>;
    },
  ) => ReturnType<typeof useQuery<Entity>>;

  useList: <TData = ApiCollectionResponse<Entity>>(
    props?: UseListProps<EntityDTO, Entity, TData>,
  ) => ReturnType<typeof useQuery<ApiCollectionResponse<Entity>, unknown, TData>>;

  useCreate: (
    props?: UseMutationOptions<Entity, AxiosError<ApiErrorPayload>, Payload>,
  ) => ReturnType<typeof useMutation<Entity, unknown, Payload>>;

  useUpdate: (
    config?: UseMutationOptions<
      Entity,
      AxiosError<ApiErrorPayload>,
      { id: Id; data: Partial<Payload> }
    >,
  ) => ReturnType<typeof useMutation<Entity, unknown, { id: Id; data: Partial<Payload> }>>;

  useDelete: (config?: {
    onMutate?: (id: Id) => any;
    onSuccess?: () => void;
    onError?: (err: unknown) => void;
  }) => ReturnType<typeof useMutation<void, unknown, Id>>;

  keys: {
    get: (id: Id) => string[];
    list: (params?: ApiGetParams<EntityDTO>) => any[];
    lists: () => string[];
  };
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

  const queryKeys = {
    get: (id: Id) => [entityName, id],
    list: (params?: ApiGetParams<EntityDTO>) => [
      entityName,
      'list',
      params ? normalize(params) : [],
    ],
    lists: () => [entityName, 'list'],
  };

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
      queryKey: queryKeys.get(id),
      queryFn: () => api.get(id.toString(), params),
      enabled: !!id,
      ...options,
    });

  const useList = <TData = ApiCollectionResponse<Entity>>(
    props?: UseListProps<EntityDTO, Entity, TData>,
  ) => {
    const { options, params } = props || {};
    const { queryKey, ...restOptions } = options || {};

    return useQuery<ApiCollectionResponse<Entity>, unknown, TData>({
      queryKey: queryKey ? queryKey : queryKeys.list(params),
      queryFn: () => api.list(params),
      ...restOptions,
    });
  };

  const useCreate = (config?: UseMutationOptions<Entity, AxiosError<ApiErrorPayload>, Payload>) => {
    const queryClient = useQueryClient();

    return useMutation({
      ...config,
      mutationFn: (data: Payload) => api.create(data),
      onMutate: config?.onMutate,
      onSuccess: (data, vars, context) => {
        queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
        config?.onSuccess?.(data, vars, context);
      },
      onError: config?.onError,
    });
  };

  const useUpdate = (
    config?: UseMutationOptions<
      Entity,
      AxiosError<ApiErrorPayload>,
      { id: Id; data: Partial<Payload> }
    >,
  ) => {
    const queryClient = useQueryClient();

    return useMutation({
      ...config,
      mutationFn: ({ id, data }: { id: Id; data: Partial<Payload> }) =>
        api.update(id.toString(), data),
      onMutate: config?.onMutate,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({ queryKey: queryKeys.get(variables.id) });
        queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
        config?.onSuccess?.(data, variables, context);
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
        queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
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
    keys: queryKeys,
  };
}
