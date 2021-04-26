import { useMachine } from '@xstate/react';
import { FetchMachineEventType, FetchMachineStateValue } from 'app/common/machines/fetchMachine';
import { useApiServices } from 'app/core/api/services/ApiServicesProvider';
import { AuthMachineEventType } from 'app/core/auth/authMachine';
import { useAuthMachine } from 'app/core/auth/AuthMachineProvider';
import { useEffect, useMemo } from 'react';
import { createLoginMachine } from './loginMachine';
import { useFormik } from 'formik';

export interface LoginForm {
  email: string;
  password: string;
}

export function useLoginCard() {
  const [, sendAuthEvent] = useAuthMachine();
  const [loginState, sendLoginEvent] = useLoginMachine();

  useEffect(() => {
    if (loginState.matches(FetchMachineStateValue.Success)) {
      sendAuthEvent({ type: AuthMachineEventType.Login, data: loginState.context.data });
    }
  }, [loginState, sendAuthEvent]);

  const { handleSubmit, handleChange, values } = useFormik<LoginForm>({
    initialValues: {
      email: '',
      password: '',
    },

    onSubmit: (values) => {
      sendLoginEvent({ type: FetchMachineEventType.Fetch, data: values });
    },
  });

  const isSubmitting = loginState.matches(FetchMachineStateValue.Pending);

  return { isSubmitting, error: loginState.context.error, values, handleChange, handleSubmit };
}

function useLoginMachine() {
  const { authService } = useApiServices();

  const loginMachine = useMemo(() => createLoginMachine({ authService }), [authService]);

  return useMachine(loginMachine, { devTools: process.env.NODE_ENV === 'development' });
}
