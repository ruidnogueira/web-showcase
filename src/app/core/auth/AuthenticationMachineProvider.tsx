import { createContext, ReactNode, useContext } from 'react';
import { useMachine, useService } from '@xstate/react';
import { Interpreter } from 'xstate';
import {
  authenticationMachine,
  AuthenticationMachineContext as MachineContext,
  AuthenticationMachineEvent,
  AuthenticationMachineState,
} from './authenticationMachine';

const AuthenticationMachineContext = createContext<
  | Interpreter<MachineContext, any, AuthenticationMachineEvent, AuthenticationMachineState>
  | undefined
>(undefined);

export function AuthenticationMachineProvider({ children }: { children: ReactNode }) {
  const [, , service] = useMachine(authenticationMachine, {
    devTools: process.env.NODE_ENV === 'development',
  });

  return (
    <AuthenticationMachineContext.Provider value={service}>
      {children}
    </AuthenticationMachineContext.Provider>
  );
}

export function useAuthenticationMachine() {
  const service = useContext(AuthenticationMachineContext);

  if (service === undefined) {
    throw new Error('useAuthenticationMachine must be used within AuthenticationMachineProvider');
  }

  const [state, send] = useService(service);
  return [state, send, service] as const;
}
