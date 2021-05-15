import { Interceptor } from './api.types';

/**
 * Sets request content and response types to JSON by default.
 */
export const defaultJsonInterceptor: Interceptor = (request, next) =>
  next({
    responseType: 'json',
    ...request,
    headers: {
      'Content-Type': 'application/json',
      ...(request.headers || {}),
    },
  });
