import {
  createFetchMachine,
  FetchMachine,
  FetchMachineEventType,
} from 'app/common/machines/fetchMachine';
import { AuthService } from 'app/core/api/services/authService';
import { ApiAuthToken, ApiCreateAuthTokenRequest } from 'app/core/models/auth.model';
import { Reader } from 'fp-ts/lib/Reader';
import { map } from 'rxjs/operators';
import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
import { LoginError } from './login.types';

export const createLoginMachine: Reader<
  { authService: AuthService },
  FetchMachine<ApiCreateAuthTokenRequest, ApiAuthToken, LoginError>
> = ({ authService }) => {
  const login = (token: ApiCreateAuthTokenRequest) => {
    return authService.login(token).pipe(
      map((response) =>
        pipe(
          response,

          E.match(
            (error) => ({
              type: FetchMachineEventType.ReceiveDataFailure,
              data: error.status === 401 ? LoginError.Invalid : LoginError.Unexpected,
            }),

            (response) => ({
              type: FetchMachineEventType.ReceiveDataSuccess,
              data: response.body,
            })
          )
        )
      )
    );
  };

  return createFetchMachine({
    id: 'login',

    fetcher: (_, event) =>
      event.type === FetchMachineEventType.Fetch ? login(event.data) : () => {},
  });
};
