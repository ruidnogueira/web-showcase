import { useMachine } from '@xstate/react';
import { FetchMachineStateValue } from 'app/common/machines/fetchMachine';
import { useApiServices } from 'app/core/api/services/ApiServicesProvider';
import { AuthMachineEventType } from 'app/core/auth/authMachine';
import { useAuthMachine } from 'app/core/auth/AuthMachineProvider';
import { useEffect, useMemo } from 'react';
import { createLoginMachine } from './loginMachine';

export function useLoginCard() {
  const [, sendAuthEvent] = useAuthMachine();
  const [loginState] = useLoginMachine();

  useEffect(() => {
    if (loginState.matches(FetchMachineStateValue.Success)) {
      // TODO DATA
      sendAuthEvent({ type: AuthMachineEventType.Login });
    }
  }, [loginState, sendAuthEvent]);

  return { error: loginState.context.error };
}

function useLoginMachine() {
  const { authService } = useApiServices();

  const loginMachine = useMemo(() => createLoginMachine(authService), [authService]);

  return useMachine(loginMachine, { devTools: process.env.NODE_ENV === 'development' });
}
