import { createApiEndpoint } from '@/shared/api/create-api-endpoint';
import { ApiCollectionResponse, ApiErrorPayload, ApiGetParams } from '@/shared/types/api';
import { normalize } from '@/shared/utils/normalize';
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

type Id = string;
type CustomError = AxiosError<ApiErrorPayload>;

type UseListProps<EntityDTO, Entity = EntityDTO, TData = ApiCollectionResponse<Entity>> = {
  params?: ApiGetParams<EntityDTO>;
  options?: Omit<
    UseQueryOptions<ApiCollectionResponse<Entity>, CustomError, TData>,
    'queryKey' | 'queryFn'
  > & { queryKey?: string[] };
};

type PageParam = Pick<ApiGetParams, 'pagination'>;

type UseInfinityListProps<EntityDTO, Entity = EntityDTO, TData = ApiCollectionResponse<Entity>> = {
  params?: ApiGetParams<EntityDTO>;
  options?: Omit<
    UseInfiniteQueryOptions<
      ApiCollectionResponse<Entity>,
      CustomError,
      InfiniteData<TData>,
      any[],
      PageParam
    >,
    'queryFn' | 'initialPageParam' | 'getNextPageParam'
  >;
};

type ReturnTypeInternal<EntityDTO, Payload, Entity = EntityDTO> = {
  useGet: (
    id: Id,
    props?: {
      options?: Omit<UseQueryOptions<Entity, CustomError>, 'queryKey' | 'queryFn'>;
      params?: ApiGetParams<EntityDTO>;
    },
  ) => UseQueryResult<Entity, CustomError>;

  useList: <TData = ApiCollectionResponse<Entity>>(
    props?: UseListProps<EntityDTO, Entity, TData>,
  ) => UseQueryResult<TData, CustomError>;

  useInfinityList: <TData = ApiCollectionResponse<Entity>>(
    props?: UseInfinityListProps<EntityDTO, Entity, TData>,
  ) => UseInfiniteQueryResult<InfiniteData<TData>, CustomError>;

  useCreate: (
    props?: UseMutationOptions<Entity, CustomError, Payload>,
  ) => UseMutationResult<Entity, CustomError, Payload>;

  useUpdate: (
    config?: UseMutationOptions<Entity, CustomError, { id: Id; data: Partial<Payload> }>,
  ) => UseMutationResult<Entity, CustomError, { id: Id; data: Partial<Payload> }>;

  useDelete: (config?: {
    onMutate?: (id: Id) => any;
    onSuccess?: () => void;
    onError?: (err: CustomError) => void;
  }) => UseMutationResult<void, CustomError, Id>;

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
      options?: Omit<UseQueryOptions<Entity, CustomError>, 'queryKey' | 'queryFn'>;
      params?: ApiGetParams<EntityDTO>;
    } = {},
  ) =>
    useQuery<Entity, CustomError>({
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

    return useQuery({
      queryKey: queryKey ? queryKey : queryKeys.list(params),
      queryFn: () => api.list(params),
      ...restOptions,
    });
  };

  const useInfinityList = <TData = ApiCollectionResponse<Entity>>(
    props?: UseInfinityListProps<EntityDTO, Entity, TData>,
  ) => {
    const { options, params } = props || {};
    const { queryKey, ...restOptions } = options || {};

    return useInfiniteQuery<
      ApiCollectionResponse<Entity>, // TQueryFnData
      CustomError, // TError
      InfiniteData<TData>, // TData (итог хука)
      any[], // TQueryKey
      PageParam // TPageParam
    >({
      initialPageParam: {
        pagination: {
          page: 1,
          pageSize: 25,
        },
      },
      queryFn: ({ pageParam }) => api.list({ ...params, ...pageParam }),
      queryKey: queryKey ? queryKey : queryKeys.list(params),
      getNextPageParam: (lastPage) => {
        const { page, total, pageSize } = lastPage.meta.pagination;

        if (total <= page * pageSize) {
          return undefined;
        }

        return {
          pagination: {
            page: page + 1,
            pageSize: pageSize,
          },
        };
      },
      ...restOptions,
    });
  };

  const useCreate = (config?: UseMutationOptions<Entity, CustomError, Payload>) => {
    const queryClient = useQueryClient();

    return useMutation({
      ...config,
      mutationFn: (data: Payload) => api.create(data),
      onMutate: config?.onMutate,
      onSuccess: (data, vars, onMutateResult, context) => {
        queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
        config?.onSuccess?.(data, vars, onMutateResult, context);
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
      onSuccess: (data, variables, onMutateResult, context) => {
        queryClient.invalidateQueries({ queryKey: queryKeys.get(variables.id) });
        queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
        config?.onSuccess?.(data, variables, onMutateResult, context);
      },
      onError: config?.onError,
    });
  };

  const useDelete = (config?: {
    onMutate?: (id: Id) => any;
    onSuccess?: () => void;
    onError?: (err: CustomError) => void;
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
    useInfinityList,
    keys: queryKeys,
  };
}
