import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { memo } from 'react';
import { LoggedOutPage } from './logged-out/LoggedOutPage';

export function App() {
  const { i18n } = useTranslation();

  return (
    <>
      <Helmet>
        <html lang={i18n.languages[0]} />
      </Helmet>

      <AppComponent />
    </>
  );
}

const AppComponent = memo(function AppComponent() {
  return <LoggedOutPage />;
});
