// Error
export interface ApiErrorPayload<T = any> {
  code: string;
  message?: string;
  details?: T;
}

export interface ApiError {
  error: ApiErrorPayload;
}

// Collection Response
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

// Get params
export interface ApiGetParams<T = Record<any, any>> {
  filters?: Partial<Record<keyof T, any>>;
  populate?: Partial<Record<keyof T, any>>;
  sort?: Partial<Record<keyof T, 'asc' | 'desc'>>;
}

// Base Entity Fields
export interface ApiEntityBase {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
