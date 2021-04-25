import { Observable, of } from 'rxjs';
import { ajax, AjaxError, AjaxRequest } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import { AppliedInterceptor, Interceptor, ApiClient, ApiResponseEither } from './api.types';
import { left, right } from 'fp-ts/lib/Either';

export function createApiClient(interceptors: Interceptor[] = []): ApiClient {
  const call = applyInterceptors(interceptors);

  return {
    call,
    get: (url, headers) => call({ method: 'GET', url, headers }),
    post: (url, body, headers) => call({ method: 'POST', url, body, headers }),
    put: (url, body, headers) => call({ method: 'PUT', url, body, headers }),
    patch: (url, body, headers) => call({ method: 'PATCH', url, body, headers }),
    delete: (url, headers) => call({ method: 'DELETE', url, headers }),
  };
}

const ajaxRequest = <Data>(data: AjaxRequest): Observable<ApiResponseEither<Data>> =>
  ajax(data).pipe(
    map((response) => left({ status: response.status, body: response.response })),
    catchError((error: AjaxError) => of(right({ status: error.status, body: error.response })))
  );

function applyInterceptors(interceptors: Interceptor[]) {
  return interceptors.reduceRight<AppliedInterceptor>(
    (previousInterceptor, currentInterceptor) => (data: AjaxRequest) =>
      currentInterceptor(data, previousInterceptor),
    ajaxRequest
  );
}
