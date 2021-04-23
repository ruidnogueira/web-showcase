import { createContext, ReactNode, useContext } from 'react';
import { useMachine, useService } from '@xstate/react';
import { Interpreter } from 'xstate';
import {
  authMachine,
  AuthMachineContext as MachineContext,
  AuthMachineEvent,
  AuthMachineState,
} from './authMachine';

const AuthMachineContext = createContext<
  Interpreter<MachineContext, any, AuthMachineEvent, AuthMachineState> | undefined
>(undefined);

export function AuthMachineProvider({ children }: { children: ReactNode }) {
  const [, , service] = useMachine(authMachine, {
    devTools: process.env.NODE_ENV === 'development',
  });

  return <AuthMachineContext.Provider value={service}>{children}</AuthMachineContext.Provider>;
}

export function useAuthMachine() {
  const service = useContext(AuthMachineContext);

  if (service === undefined) {
    throw new Error('useAuthMachine must be used within AuthMachineProvider');
  }

  const [state, send] = useService(service);
  return [state, send, service] as const;
}
