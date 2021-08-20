import { createContext, ReactNode, useContext, useMemo } from 'react';
import { useActor, useMachine } from '@xstate/react';
import { Interpreter } from 'xstate';
import {
  AuthMachineContext as MachineContext,
  AuthMachineEvent,
  AuthMachineState,
  createAuthMachine,
} from './auth-machine';
import { useConfig } from '../configs/ConfigProvider';

const AuthMachineContext = createContext<
  Interpreter<MachineContext, any, AuthMachineEvent, AuthMachineState> | undefined
>(undefined);

export function AuthMachineProvider({
  children,
  service,
}: {
  children: ReactNode;
  service?: Interpreter<MachineContext, any, AuthMachineEvent, AuthMachineState>;
}) {
  const { storageKeys } = useConfig();

  const authMachine = useMemo(() => createAuthMachine({ storageKeys }), [storageKeys]);
  const [, , defaultService] = useMachine(authMachine, {
    devTools: process.env.NODE_ENV === 'development',
  });

  return (
    <AuthMachineContext.Provider value={service ?? defaultService}>
      {children}
    </AuthMachineContext.Provider>
  );
}

export function useAuthMachine() {
  const service = useContext(AuthMachineContext);

  if (service === undefined) {
    throw new Error('useAuthMachine must be used within AuthMachineProvider');
  }

  const [state, send] = useActor(service);
  return [state, send, service] as const;
}
