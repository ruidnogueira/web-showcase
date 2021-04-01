import logo from 'assets/logo.svg';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

export function App() {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Helmet>
        <html lang={i18n.languages[0]} />
      </Helmet>

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{t('appWorking')}</p>
        </header>
      </div>
    </>
  );
}
