import logo from 'assets/logo.svg';
import { useTranslation } from 'react-i18next';

export function App() {
  const { t } = useTranslation();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{t('appWorking')}</p>
      </header>
    </div>
  );
}
