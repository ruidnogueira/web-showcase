import { useMachine } from '@xstate/react';
import { FetchMachineEventType, FetchMachineStateValue } from 'app/common/machines/fetchMachine';
import { useApiServices } from 'app/core/api/services/ApiServicesProvider';
import { AuthMachineEventType } from 'app/core/auth/authMachine';
import { useAuthMachine } from 'app/core/auth/AuthMachineProvider';
import { useEffect, useMemo } from 'react';
import { createLoginMachine } from './loginMachine';
import { FormikErrors, useFormik } from 'formik';
import { LoginError, LoginForm } from './login.types';

export function useLoginCard() {
  const [, sendAuthEvent] = useAuthMachine();
  const [loginState, sendLoginEvent] = useLoginMachine();

  useEffect(() => {
    if (loginState.matches(FetchMachineStateValue.Success)) {
      sendAuthEvent({ type: AuthMachineEventType.Login, data: loginState.context.data });
    }
  }, [loginState, sendAuthEvent]);

  const { handleSubmit, handleChange, values, errors } = useFormik<LoginForm>({
    initialValues: {
      email: '',
      password: '',
    },

    validate: (values): FormikErrors<LoginForm> => {
      const errors: FormikErrors<LoginForm> = {};

      if (!values.email) {
        errors.email = 'required';
      }

      if (!values.password) {
        errors.password = 'required';
      }

      return errors;
    },

    validateOnChange: false,
    validateOnBlur: false,

    onSubmit: (values) => {
      sendLoginEvent({ type: FetchMachineEventType.Fetch, data: values });
    },
  });

  const formError = Object.keys(errors).length > 0 ? LoginError.Invalid : undefined;

  const isSubmitting = loginState.matches(FetchMachineStateValue.Pending);

  return {
    isSubmitting,
    error: formError ?? loginState.context.error,
    values,
    handleChange,
    handleSubmit,
  };
}

function useLoginMachine() {
  const { authService } = useApiServices();

  const loginMachine = useMemo(() => createLoginMachine({ authService }), [authService]);

  return useMachine(loginMachine, { devTools: process.env.NODE_ENV === 'development' });
}
