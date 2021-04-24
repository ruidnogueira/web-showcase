import { Observable } from 'rxjs';
import { ajax, AjaxRequest } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { ApiResponse, AppliedInterceptor, Interceptor, ApiClient } from './api.types';

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

const ajaxRequest = <T>(data: AjaxRequest): Observable<ApiResponse<T>> =>
  ajax(data).pipe(map((response) => ({ status: response.status, body: response.response })));

function applyInterceptors(interceptors: Interceptor[]) {
  return interceptors.reduceRight<AppliedInterceptor>(
    (previousInterceptor, currentInterceptor) => (data: AjaxRequest) =>
      currentInterceptor(data, previousInterceptor),
    ajaxRequest
  );
}
