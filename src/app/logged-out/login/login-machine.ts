import { createFetchModel, FetchMachineState } from 'app/common/machines/fetch-machine';
import { AuthService } from 'app/core/api/services/auth-service';
import { ApiAuthToken, ApiCreateAuthTokenRequest } from 'app/core/models/auth.model';
import { Reader } from 'fp-ts/lib/Reader';
import { map } from 'rxjs/operators';
import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
import { LoginError } from './login.types';
import { ContextFrom, EventFrom, StateMachine } from 'xstate';

export type LoginMachineContext = ContextFrom<typeof fetchModel>;
export type LoginMachineEvent = EventFrom<typeof fetchModel>;
export type LoginMachineState = FetchMachineState<ApiAuthToken, LoginError>;
export { FetchMachineStateValue as LoginMachineStateValue } from 'app/common/machines/fetch-machine';

const { fetchModel, createFetchMachine } = createFetchModel<
  ApiCreateAuthTokenRequest,
  ApiAuthToken,
  LoginError
>();

export const loginEvents = fetchModel.events;

export const createLoginMachine: Reader<
  { authService: AuthService },
  StateMachine<LoginMachineContext, any, LoginMachineEvent, LoginMachineState>
> = ({ authService }) => {
  const login = (token: ApiCreateAuthTokenRequest) =>
    authService.login(token).pipe(
      map((response) =>
        pipe(
          response,

          E.match(
            (error) =>
              loginEvents.receiveDataFailure(
                error.status === 401 ? LoginError.Invalid : LoginError.Unexpected
              ) as LoginMachineEvent,

            (response) => loginEvents.receiveDataSuccess(response.body) as LoginMachineEvent
          )
        )
      )
    );

  return createFetchMachine({
    id: 'login',
    fetcher: (_, event) => login(event.data),
  });
};
