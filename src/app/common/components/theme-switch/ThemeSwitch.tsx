import { Switch } from '../switch/Switch';
import { Sun, Moon } from 'react-feather';
import { useTheme } from 'app/core/providers/ThemeProvider';
import styles from './ThemeSwitch.module.scss';
import VisuallyHidden from '@reach/visually-hidden';
import { useTranslation } from 'react-i18next';
import { ControlSize } from 'app/core/models/styles.model';

export function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <>
      <VisuallyHidden id="theme-switch-label">
        {t('components.themeSwitch.' + theme)}
      </VisuallyHidden>
      <Switch
        className={styles.switch}
        aria-labelledby="theme-switch-label"
        size={ControlSize.Small}
        checked={theme === 'light'}
        onChange={toggleTheme}
        thumbChildren={({ isChecked }) =>
          isChecked ? <Sun className={styles.icon} /> : <Moon className={styles.icon} />
        }
      />
    </>
  );
}
