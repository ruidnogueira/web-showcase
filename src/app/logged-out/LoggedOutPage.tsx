import { LoginCard } from './login/LoginCard';
import styles from './LoggedOutPage.module.scss';
import { LanguageSelect } from 'app/common/components/language-select/LanguageSelect';

export function LoggedOutPage() {
  return (
    <div className={styles.backdrop} data-testid="logged_out-page">
      <LoginCard className={styles.card} />

      <div className={styles.languageField}>
        <LanguageSelect />
      </div>
    </div>
  );
}
