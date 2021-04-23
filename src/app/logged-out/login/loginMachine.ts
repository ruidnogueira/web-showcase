import { createFetchMachine } from 'app/common/machines/fetchMachine';
import { ApiAuthToken, ApiCreateAuthTokenRequest } from 'app/core/models/auth.model';

export enum LoginMachineError {
  Invalid = 'INVALID',
  Unexpected = 'UNEXPECTED',
}

export const loginMachine = createFetchMachine<
  ApiCreateAuthTokenRequest,
  ApiAuthToken,
  LoginMachineError
>({
  id: 'login',
  fetcher: () => () => {
    // TODO
  },
});
