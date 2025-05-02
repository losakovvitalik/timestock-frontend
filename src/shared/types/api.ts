export interface ApiErrorPayload<T = any> {
  code: string;
  message?: string;
  details?: T;
}

export interface ApiError {
  error: ApiErrorPayload;
}
