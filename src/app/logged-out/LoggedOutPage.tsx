import { LoginCard } from './LoginCard';
import styles from './LoggedOutPage.module.scss';

export function LoggedOutPage() {
  return (
    <div className={styles.backdrop}>
      <LoginCard className={styles.card} />
    </div>
  );
}
