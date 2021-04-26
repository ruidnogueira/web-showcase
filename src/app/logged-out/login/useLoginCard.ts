import { useMachine } from '@xstate/react';
import { FetchMachineEventType, FetchMachineStateValue } from 'app/common/machines/fetchMachine';
import { useApiServices } from 'app/core/api/services/ApiServicesProvider';
import { AuthMachineEventType } from 'app/core/auth/authMachine';
import { useAuthMachine } from 'app/core/auth/AuthMachineProvider';
import { FormEvent, useEffect, useMemo } from 'react';
import { createLoginMachine } from './loginMachine';

export function useLoginCard() {
  const [, sendAuthEvent] = useAuthMachine();
  const [loginState, sendLoginEvent] = useLoginMachine();

  useEffect(() => {
    if (loginState.matches(FetchMachineStateValue.Success)) {
      // TODO DATA
      sendAuthEvent({ type: AuthMachineEventType.Login });
    }
  }, [loginState, sendAuthEvent]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO ANY
    sendLoginEvent({ type: FetchMachineEventType.Fetch, data: {} as any });
  };

  const isSubmitting = loginState.matches(FetchMachineStateValue.Pending);

  return { isSubmitting, error: loginState.context.error, handleSubmit };
}

function useLoginMachine() {
  const { authService } = useApiServices();

  const loginMachine = useMemo(() => createLoginMachine({ authService }), [authService]);

  return useMachine(loginMachine, { devTools: process.env.NODE_ENV === 'development' });
}
