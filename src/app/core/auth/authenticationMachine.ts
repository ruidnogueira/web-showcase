import { createMachine, send } from 'xstate';

export type AuthenticationMachineContext = {};

export enum AuthenticationMachineEventType {
  CheckIfLoggedIn = 'CHECK_IF_LOGGED_IN',
  Login = 'LOGIN',
  Logout = 'LOGOUT',
}

export type AuthenticationMachineEvent =
  | { type: AuthenticationMachineEventType.CheckIfLoggedIn }
  | { type: AuthenticationMachineEventType.Logout }
  | { type: AuthenticationMachineEventType.Login };

export enum AuthenticationMachineStateValue {
  CheckingIfLoggedIn = 'checkingIfLoggedIn',
  LoggedIn = 'loggedIn',
  LoggedOut = 'loggedOut',
}

export type AuthenticationMachineState = {
  value: AuthenticationMachineStateValue;
  context: {};
};

export enum AuthenticationMachineGuard {
  IsLoggedIn = 'isLoggedIn',
}

export const authenticationMachine = createMachine<
  AuthenticationMachineContext,
  AuthenticationMachineEvent,
  AuthenticationMachineState
>(
  {
    id: 'authentication',
    initial: AuthenticationMachineStateValue.CheckingIfLoggedIn,
    states: {
      [AuthenticationMachineStateValue.CheckingIfLoggedIn]: {
        entry: send({ type: AuthenticationMachineEventType.CheckIfLoggedIn }),
        on: {
          [AuthenticationMachineEventType.CheckIfLoggedIn]: [
            {
              target: AuthenticationMachineStateValue.LoggedIn,
              cond: AuthenticationMachineGuard.IsLoggedIn,
            },
            { target: AuthenticationMachineStateValue.LoggedOut },
          ],
        },
      },

      [AuthenticationMachineStateValue.LoggedIn]: {
        on: {
          [AuthenticationMachineEventType.Logout]: AuthenticationMachineStateValue.LoggedOut,
        },
      },

      [AuthenticationMachineStateValue.LoggedOut]: {
        on: {
          [AuthenticationMachineEventType.Login]: AuthenticationMachineStateValue.LoggedIn,
        },
      },
    },
  },
  {
    guards: {
      [AuthenticationMachineGuard.IsLoggedIn]: () => {
        return false; // TODO
      },
    },
  }
);
