import { Button } from 'app/common/components/button/Button';
import { AuthMachineEventType } from 'app/core/auth/authMachine';
import { useAuthMachine } from 'app/core/auth/AuthMachineProvider';
import { MouseEvent } from 'react';

export function LoggedInPage() {
  const [, sendAuthEvent] = useAuthMachine();

  const handleLogout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    sendAuthEvent({ type: AuthMachineEventType.Logout });
  };

  return (
    <div>
      <Button type="button" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
