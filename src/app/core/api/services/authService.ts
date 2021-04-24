import { ApiAuthToken, ApiCreateAuthTokenRequest } from 'app/core/models/auth.model';
import { Observable } from 'rxjs';
import { ApiClient, ApiResponse } from '../api.types';

export interface AuthService {
  login: (user: ApiCreateAuthTokenRequest) => Observable<ApiResponse<ApiAuthToken>>;
}

const apiPath = process.env.REACT_APP_API_PATH;

export function createAuthService(api: ApiClient): AuthService {
  return {
    login: (user) => api.post(apiPath + '/auth-token', user),
  };
}
