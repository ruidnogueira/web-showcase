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

export enum LoginMachineError {
  Invalid = 'INVALID',
  Unexpected = 'UNEXPECTED',
}

export const createLoginMachine: Reader<
  { authService: AuthService },
  FetchMachine<ApiCreateAuthTokenRequest, ApiAuthToken, LoginMachineError>
> = ({ authService }) => {
  return createFetchMachine({
    id: 'login',

    fetcher: (_, event) =>
      authService.login(event.data).pipe(
        map((response) =>
          pipe(
            response,

            E.match(
              (error) => ({
                type: FetchMachineEventType.ReceiveDataFailure,
                data:
                  error.status === 401 ? LoginMachineError.Invalid : LoginMachineError.Unexpected,
              }),

              (response) => ({
                type: FetchMachineEventType.ReceiveDataSuccess,
                data: response.body,
              })
            )
          )
        )
      ),
  });
};
