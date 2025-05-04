export interface ApiErrorPayload<T = any> {
  code: string;
  message?: string;
  details?: T;
}

export interface ApiError {
  error: ApiErrorPayload;
}

export interface ApiCollectionResponse<T = any> {
  data: T[];
  meta: Meta;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
