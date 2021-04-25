import { Either } from 'fp-ts/lib/Either';
import { Observable } from 'rxjs';
import { AjaxRequest } from 'rxjs/ajax';

export interface ApiResponse<T = unknown> {
  status: number;
  body: T;
}

export interface ApiErrorResponse {
  status: number;
  body: any;
}

export type ApiResponseEither<ResponseData = unknown> = Either<
  ApiErrorResponse,
  ApiResponse<ResponseData>
>;

export type AppliedInterceptor = <Data>(data: AjaxRequest) => Observable<ApiResponseEither<Data>>;

export type Interceptor = <Data>(
  data: AjaxRequest,
  next: AppliedInterceptor
) => Observable<ApiResponseEither<Data>>;

export interface ApiClient {
  call: <Data>(data: AjaxRequest) => Observable<ApiResponseEither<Data>>;

  get: <Data>(url: string, headers?: AjaxRequest['headers']) => Observable<ApiResponseEither<Data>>;

  post: <Data>(
    url: string,
    body?: any,
    headers?: AjaxRequest['headers']
  ) => Observable<ApiResponseEither<Data>>;

  put: <Data>(
    url: string,
    body?: any,
    headers?: AjaxRequest['headers']
  ) => Observable<ApiResponseEither<Data>>;

  patch: <Data>(
    url: string,
    body?: any,
    headers?: AjaxRequest['headers']
  ) => Observable<ApiResponseEither<Data>>;

  delete: <Data>(
    url: string,
    headers?: AjaxRequest['headers']
  ) => Observable<ApiResponseEither<Data>>;
}
