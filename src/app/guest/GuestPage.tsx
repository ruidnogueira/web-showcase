import { useTranslation } from 'react-i18next';
import { useTheme } from 'app/core/providers/ThemeProvider';

export function GuestPage() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <p>{t('appWorking')}</p>
      <button onClick={toggleTheme}>theme: {theme}</button>
    </>
  );
}
