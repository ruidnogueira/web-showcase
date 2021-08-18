import { getFromLocalStorage, saveToLocalStorage } from 'app/common/utils/browser.util';
import { Reader } from 'fp-ts/lib/Reader';
import { ContextFrom, EventFrom, send, StateMachine, ExtractEvent } from 'xstate';
import { StorageKeys } from 'app/core/configs/storage.config';
import { ApiAuthToken } from '../models/auth.model';
import { createModel } from 'xstate/lib/model';
import { fixModelEventNames } from 'app/common/utils/machine.util';

export type AuthMachineContext = ContextFrom<typeof authModel>;
export type AuthMachineEvent = EventFrom<typeof authModel>;

export enum AuthMachineStateValue {
  CheckingIfLoggedIn = 'checkingIfLoggedIn',
  LoggedIn = 'loggedIn',
  LoggedOut = 'loggedOut',
}

export type AuthMachineState = {
  value: AuthMachineStateValue;
  context: AuthMachineContext;
};

const authModel = createModel(
  {},
  {
    events: {
      checkIfLoggedIn: () => ({}),
      login: (token: ApiAuthToken) => ({ token }),
      logout: () => ({}),
    },
  }
);

export const authEvents = fixModelEventNames(authModel.events);

export const createAuthMachine: Reader<
  { storageKeys: StorageKeys },
  StateMachine<AuthMachineContext, any, AuthMachineEvent, AuthMachineState>
> = ({ storageKeys }) => {
  const storeToken = (_: any, event: ExtractEvent<AuthMachineEvent, 'login'>) =>
    saveToLocalStorage(storageKeys.authToken, event.token);

  const clearToken = () => localStorage.removeItem(storageKeys.authToken);

  const isLoggedIn = () => Boolean(getFromLocalStorage<ApiAuthToken>(storageKeys.authToken));

  return authModel.createMachine({
    id: 'auth',
    context: authModel.initialContext,
    initial: AuthMachineStateValue.CheckingIfLoggedIn,
    states: {
      [AuthMachineStateValue.CheckingIfLoggedIn]: {
        on: {
          checkIfLoggedIn: [
            {
              target: AuthMachineStateValue.LoggedIn,
              cond: isLoggedIn,
            },
            { target: AuthMachineStateValue.LoggedOut },
          ],
        },
        entry: send(authEvents.checkIfLoggedIn()),
      },

      [AuthMachineStateValue.LoggedIn]: {
        on: {
          logout: {
            target: AuthMachineStateValue.LoggedOut,
            actions: clearToken,
          },
        },
      },

      [AuthMachineStateValue.LoggedOut]: {
        on: {
          login: {
            target: AuthMachineStateValue.LoggedIn,
            actions: storeToken,
          },
        },
      },
    },
  });
};
