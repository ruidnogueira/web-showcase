import { getFromLocalStorage, saveToLocalStorage } from 'app/common/utils/browser.util';
import { Reader } from 'fp-ts/lib/Reader';
import { createMachine, send, StateMachine } from 'xstate';
import { StorageKeys } from 'app/core/configs/storage.config';
import { ApiAuthToken } from '../models/auth.model';

export type AuthMachineContext = {};

export enum AuthMachineEventType {
  CheckIfLoggedIn = 'CHECK_IF_LOGGED_IN',
  Login = 'LOGIN',
  Logout = 'LOGOUT',
}

export type AuthMachineEvent =
  | { type: AuthMachineEventType.CheckIfLoggedIn }
  | { type: AuthMachineEventType.Logout }
  | LoginEvent;

interface LoginEvent {
  type: AuthMachineEventType.Login;
  data: ApiAuthToken;
}

export enum AuthMachineStateValue {
  CheckingIfLoggedIn = 'checkingIfLoggedIn',
  LoggedIn = 'loggedIn',
  LoggedOut = 'loggedOut',
}

export type AuthMachineState = {
  value: AuthMachineStateValue;
  context: {};
};

export const createAuthMachine: Reader<
  { storageKeys: StorageKeys },
  StateMachine<AuthMachineContext, any, AuthMachineEvent, AuthMachineState>
> = ({ storageKeys }) => {
  const storeToken = (_: any, event: LoginEvent) =>
    saveToLocalStorage(storageKeys.authToken, event.data);

  const clearToken = () => localStorage.removeItem(storageKeys.authToken);

  const isLoggedIn = () => Boolean(getFromLocalStorage<ApiAuthToken>(storageKeys.authToken));

  return createMachine({
    id: 'auth',
    initial: AuthMachineStateValue.CheckingIfLoggedIn,
    states: {
      [AuthMachineStateValue.CheckingIfLoggedIn]: {
        on: {
          [AuthMachineEventType.CheckIfLoggedIn]: [
            {
              target: AuthMachineStateValue.LoggedIn,
              cond: isLoggedIn,
            },
            { target: AuthMachineStateValue.LoggedOut },
          ],
        },
        entry: send({ type: AuthMachineEventType.CheckIfLoggedIn }),
      },

      [AuthMachineStateValue.LoggedIn]: {
        on: {
          [AuthMachineEventType.Logout]: {
            target: AuthMachineStateValue.LoggedOut,
            actions: clearToken,
          },
        },
      },

      [AuthMachineStateValue.LoggedOut]: {
        on: {
          [AuthMachineEventType.Login]: {
            target: AuthMachineStateValue.LoggedIn,
            actions: storeToken,
          },
        },
      },
    },
  });
};
