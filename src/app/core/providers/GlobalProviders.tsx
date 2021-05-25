import { NotificationProvider } from 'app/common/components/notification/NotificationProvider';
import { ReactNode } from 'react';
import { ApiProvider } from '../api/ApiProvider';
import { ApiServicesProvider } from '../api/services/ApiServicesProvider';
import { AuthMachineProvider } from '../auth/AuthMachineProvider';

export function GlobalProviders({ children }: { children: ReactNode }) {
  return (
    <NotificationProvider>
      <ApiProvider>
        <ApiServicesProvider>
          <AuthMachineProvider>{children}</AuthMachineProvider>
        </ApiServicesProvider>
      </ApiProvider>
    </NotificationProvider>
  );
}
