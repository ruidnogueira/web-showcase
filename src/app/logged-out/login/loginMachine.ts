import { createFetchMachine } from 'app/common/machines/fetchMachine';
import { AuthService } from 'app/core/api/services/authService';
import { ApiAuthToken, ApiCreateAuthTokenRequest } from 'app/core/models/auth.model';

export enum LoginMachineError {
  Invalid = 'INVALID',
  Unexpected = 'UNEXPECTED',
}

export function createLoginMachine(authService: AuthService) {
  return createFetchMachine<ApiCreateAuthTokenRequest, ApiAuthToken, LoginMachineError>({
    id: 'login',
    fetcher: () => () => {
      // TODO
    },
  });
}
