import { ApiAuthToken, ApiCreateAuthTokenRequest } from 'app/core/models/auth.model';
import { Observable } from 'rxjs';
import { ApiClient, ApiResponseEither } from '../api.types';
import { Reader } from 'fp-ts/lib/Reader';

export interface AuthService {
  login: (user: ApiCreateAuthTokenRequest) => Observable<ApiResponseEither<ApiAuthToken>>;
}

const apiPath = process.env.REACT_APP_API_PATH;

export const createAuthService: Reader<{ api: ApiClient }, AuthService> = ({ api }) => ({
  login: (user) => api.post(apiPath + '/auth-token', user),
});
