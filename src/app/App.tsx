import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useTheme } from './core/providers/ThemeProvider';

export function App() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Helmet>
        <html lang={i18n.languages[0]} />
      </Helmet>

      <p>{t('appWorking')}</p>
      <button onClick={toggleTheme}>theme: {theme}</button>
    </>
  );
}
