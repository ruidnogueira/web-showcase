import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { memo } from 'react';
import { LoggedOutPage } from './logged-out/LoggedOutPage';
import { useAuthenticationMachine } from './core/auth/AuthenticationMachineProvider';
import { AuthenticationMachineStateValue } from './core/auth/authenticationMachine';
import { LoggedInPage } from './logged-in/LoggedInPage';

export function App() {
  const { i18n } = useTranslation();
  const [authState] = useAuthenticationMachine();
  const isLoggedIn = authState.matches(AuthenticationMachineStateValue.LoggedIn);

  return (
    <>
      <Helmet>
        <html lang={i18n.languages[0]} />
      </Helmet>

      <AppComponent isLoggedIn={isLoggedIn} />
    </>
  );
}

const AppComponent = memo(function AppComponent({ isLoggedIn }: { isLoggedIn: boolean }) {
  return isLoggedIn ? <LoggedInPage /> : <LoggedOutPage />;
});
