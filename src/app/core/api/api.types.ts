import { Observable } from 'rxjs';
import { AjaxRequest } from 'rxjs/ajax';

export interface ApiResponse<T> {
  status: number;
  body: T;
}

export type AppliedInterceptor = <T>(data: AjaxRequest) => Observable<ApiResponse<T>>;

export type Interceptor = <T>(
  data: AjaxRequest,
  next: AppliedInterceptor
) => Observable<ApiResponse<T>>;

export interface ApiClient {
  call: <T>(data: AjaxRequest) => Observable<ApiResponse<T>>;

  get: <T>(url: string, headers?: AjaxRequest['headers']) => Observable<ApiResponse<T>>;

  post: <T>(
    url: string,
    body?: any,
    headers?: AjaxRequest['headers']
  ) => Observable<ApiResponse<T>>;

  put: <T>(url: string, body?: any, headers?: AjaxRequest['headers']) => Observable<ApiResponse<T>>;

  patch: <T>(
    url: string,
    body?: any,
    headers?: AjaxRequest['headers']
  ) => Observable<ApiResponse<T>>;

  delete: <T>(url: string, headers?: AjaxRequest['headers']) => Observable<ApiResponse<T>>;
}
