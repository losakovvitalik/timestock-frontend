import { $api } from '../lib/api';
import { ApiCollectionResponse, ApiGetParams } from '../types/api';

// Перегрузки
// Без mapFn
export function createApiEndpoint<
  EntityDTO extends Record<any, any>,
  EntityPayload = Record<any, any>,
>(
  basePath: string,
): {
  get: (id: string, params?: ApiGetParams<EntityDTO>) => Promise<EntityDTO>;
  list: (params?: ApiGetParams<EntityDTO>) => Promise<ApiCollectionResponse<EntityDTO>>;
  create: (data: EntityPayload) => Promise<EntityDTO>;
  update: (id: string, data: Partial<EntityPayload>) => Promise<EntityDTO>;
  delete: (id: string) => Promise<void>;
};
// C mapFn
export function createApiEndpoint<
  EntityDTO extends Record<any, any>,
  EntityPayload = Record<any, any>,
  Entity = Record<any, any>,
>(
  basePath: string,
  mapFn: (dto: EntityDTO) => Entity,
): {
  get: (id: string, params?: ApiGetParams<EntityDTO>) => Promise<Entity>;
  list: (params?: ApiGetParams<EntityDTO>) => Promise<ApiCollectionResponse<Entity>>;
  create: (data: EntityPayload) => Promise<Entity>;
  update: (id: string, data: Partial<EntityPayload>) => Promise<Entity>;
  delete: (id: string) => Promise<void>;
};
// Реализация
export function createApiEndpoint<
  EntityDTO extends Record<any, any>,
  EntityPayload = Record<any, any>,
  Entity = Record<any, any>,
>(basePath: string, mapFn?: (dto: EntityDTO) => Entity) {
  return {
    get: (id: string, params: ApiGetParams<EntityDTO>) =>
      $api
        .get<{ data: EntityDTO }>(`${basePath}/${id}`, {
          params,
        })
        .then((r) => (mapFn ? mapFn(r.data.data) : r.data.data)),

    list: (params?: ApiGetParams<EntityDTO>) => {
      console.log(params);

      return $api
        .get<ApiCollectionResponse<EntityDTO>>(basePath, {
          params,
        })
        .then((r) =>
          mapFn
            ? ({ data: r.data.data.map(mapFn), meta: r.data.meta } as ApiCollectionResponse<Entity>)
            : r.data,
        );
    },

    create: (data: EntityPayload) =>
      $api
        .post<{ data: EntityDTO }>(basePath, { data })
        .then((r) => (mapFn ? mapFn(r.data.data) : r.data.data)),

    update: (id: string, data: EntityPayload) =>
      $api
        .put<{ data: EntityDTO }>(`${basePath}/${id}`, { data }, {})
        .then((r) => (mapFn ? mapFn(r.data.data) : r.data.data)),

    delete: (id: string) => $api.delete<void>(`${basePath}/${id}`).then((r) => r.data),
  };
}
