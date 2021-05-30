import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { memo } from 'react';
import { LoggedOutPage } from './logged-out/LoggedOutPage';
import { useAuthMachine } from './core/auth/AuthMachineProvider';
import { AuthMachineStateValue } from './core/auth/authMachine';
import { LoggedInPage } from './logged-in/LoggedInPage';
import { useServiceWorkerUpdateNotification } from './common/components/sw-update-notification/ServiceWorkerUpdateNotification';

export function App() {
  const { i18n } = useTranslation();
  const [authState] = useAuthMachine();
  const isLoggedIn = authState.matches(AuthMachineStateValue.LoggedIn);

  useServiceWorkerUpdateNotification();

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
