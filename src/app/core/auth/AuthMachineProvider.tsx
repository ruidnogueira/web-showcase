import { createContext, ReactNode, useContext, useMemo } from 'react';
import { useMachine, useService } from '@xstate/react';
import { Interpreter } from 'xstate';
import {
  AuthMachineContext as MachineContext,
  AuthMachineEvent,
  AuthMachineState,
  createAuthMachine,
} from './authMachine';
import { useConfig } from '../configs/ConfigProvider';

const AuthMachineContext = createContext<
  Interpreter<MachineContext, any, AuthMachineEvent, AuthMachineState> | undefined
>(undefined);

export function AuthMachineProvider({ children }: { children: ReactNode }) {
  const { storageKeys } = useConfig();

  const authMachine = useMemo(() => createAuthMachine({ storageKeys }), [storageKeys]);
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
