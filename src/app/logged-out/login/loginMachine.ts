import { createFetchMachine, FetchMachine } from 'app/common/machines/fetchMachine';
import { AuthService } from 'app/core/api/services/authService';
import { ApiAuthToken, ApiCreateAuthTokenRequest } from 'app/core/models/auth.model';
import { Reader } from 'fp-ts/lib/Reader';

export enum LoginMachineError {
  Invalid = 'INVALID',
  Unexpected = 'UNEXPECTED',
}

export const createLoginMachine: Reader<
  { authService: AuthService },
  FetchMachine<ApiCreateAuthTokenRequest, ApiAuthToken, LoginMachineError>
> = ({ authService }) => {
  return createFetchMachine<ApiCreateAuthTokenRequest, ApiAuthToken, LoginMachineError>({
    id: 'login',
    fetcher: () => () => {
      // TODO
    },
  });
};
