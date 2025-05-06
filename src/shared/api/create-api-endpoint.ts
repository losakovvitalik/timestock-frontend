import { $api } from '../lib/api';
import { ApiCollectionResponse, ApiGetParams } from '../types/api';

export const createApiEndpoint = <
  Entity extends Record<any, any>,
  EntityPayload = Record<any, any>,
>(
  basePath: string,
) => {
  return {
    get: (id: string) => $api.get<{ data: Entity }>(`${basePath}/${id}`).then((r) => r.data),
    list: (params?: ApiGetParams<Entity>) =>
      $api
        .get<ApiCollectionResponse<Entity>>(basePath, {
          params,
        })
        .then((r) => r.data),
    create: (data: EntityPayload) =>
      $api.post<{ data: Entity }>(basePath, { data }).then((r) => r.data),
    update: (id: string, data: EntityPayload) =>
      $api.put<{ data: Entity }>(`${basePath}/${id}`, { data }).then((r) => r.data),
    delete: <T = void>(id: string) => $api.delete<T>(`${basePath}/${id}`),
  };
};
