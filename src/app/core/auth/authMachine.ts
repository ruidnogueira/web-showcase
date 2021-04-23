import { createMachine, send } from 'xstate';

export type AuthMachineContext = {};

export enum AuthMachineEventType {
  CheckIfLoggedIn = 'CHECK_IF_LOGGED_IN',
  Login = 'LOGIN',
  Logout = 'LOGOUT',
}

export type AuthMachineEvent =
  | { type: AuthMachineEventType.CheckIfLoggedIn }
  | { type: AuthMachineEventType.Logout }
  | { type: AuthMachineEventType.Login };

export enum AuthMachineStateValue {
  CheckingIfLoggedIn = 'checkingIfLoggedIn',
  LoggedIn = 'loggedIn',
  LoggedOut = 'loggedOut',
}

export type AuthMachineState = {
  value: AuthMachineStateValue;
  context: {};
};

export enum AuthMachineGuard {
  IsLoggedIn = 'isLoggedIn',
}

export const authMachine = createMachine<AuthMachineContext, AuthMachineEvent, AuthMachineState>(
  {
    id: 'auth',
    initial: AuthMachineStateValue.CheckingIfLoggedIn,
    states: {
      [AuthMachineStateValue.CheckingIfLoggedIn]: {
        on: {
          [AuthMachineEventType.CheckIfLoggedIn]: [
            {
              target: AuthMachineStateValue.LoggedIn,
              cond: AuthMachineGuard.IsLoggedIn,
            },
            { target: AuthMachineStateValue.LoggedOut },
          ],
        },
        entry: send({ type: AuthMachineEventType.CheckIfLoggedIn }),
      },

      [AuthMachineStateValue.LoggedIn]: {
        on: {
          [AuthMachineEventType.Logout]: AuthMachineStateValue.LoggedOut,
        },
      },

      [AuthMachineStateValue.LoggedOut]: {
        on: {
          [AuthMachineEventType.Login]: AuthMachineStateValue.LoggedIn,
        },
      },
    },
  },
  {
    guards: {
      [AuthMachineGuard.IsLoggedIn]: () => {
        return false; // TODO
      },
    },
  }
);
