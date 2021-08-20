import { useMachine } from '@xstate/react';
import { useApiServices } from 'app/core/api/services/ApiServicesProvider';
import { useAuthMachine } from 'app/core/auth/AuthMachineProvider';
import { useEffect, useMemo } from 'react';
import { createLoginMachine, loginEvents, LoginMachineStateValue } from './login-machine';
import { FormikErrors, useFormik } from 'formik';
import { LoginError, LoginForm } from './login.types';
import { authEvents } from 'app/core/auth/auth-machine';

export function useLoginCard() {
  const [, sendAuthEvent] = useAuthMachine();
  const [loginState, sendLoginEvent] = useLoginMachine();

  useEffect(() => {
    if (loginState.matches(LoginMachineStateValue.Success)) {
      sendAuthEvent(authEvents.login(loginState.context.data));
    }
  }, [loginState, sendAuthEvent]);

  const { handleSubmit, handleChange, values, errors } = useFormik<LoginForm>({
    initialValues: {
      email: '',
      password: '',
    },

    validate,
    validateOnChange: false,
    validateOnBlur: false,

    onSubmit: (values) => {
      sendLoginEvent(loginEvents.fetch(values));
    },
  });

  const formError = Object.keys(errors).length > 0 ? LoginError.Invalid : undefined;

  const isSubmitting = loginState.matches(LoginMachineStateValue.Pending);

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

function validate(values: LoginForm): FormikErrors<LoginForm> {
  const errors: FormikErrors<LoginForm> = {};

  if (!values.email) {
    errors.email = 'required';
  }

  if (!values.password) {
    errors.password = 'required';
  }

  return errors;
}
