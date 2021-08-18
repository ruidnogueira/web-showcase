import { Button } from 'app/common/components/button/Button';
import { authEvents } from 'app/core/auth/authMachine';
import { useAuthMachine } from 'app/core/auth/AuthMachineProvider';
import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

export function LoggedInPage() {
  const [, sendAuthEvent] = useAuthMachine();
  const { t } = useTranslation();

  const handleLogout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    sendAuthEvent(authEvents.logout());
  };

  return (
    <div data-testid="logged_in-page">
      <Button type="button" onClick={handleLogout}>
        {t('pages.home.logout')}
      </Button>
    </div>
  );
}
