import { ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ApiProvider } from '../api/ApiProvider';
import { ApiServicesProvider } from '../api/services/ApiServicesProvider';
import { AuthMachineProvider } from '../auth/AuthMachineProvider';
import { ThemeProvider } from './ThemeProvider';

export function GlobalProviders({ children }: { children: ReactNode }) {
  return (
    <HelmetProvider>
      <ApiProvider>
        <ApiServicesProvider>
          <ThemeProvider>
            <AuthMachineProvider>{children}</AuthMachineProvider>
          </ThemeProvider>
        </ApiServicesProvider>
      </ApiProvider>
    </HelmetProvider>
  );
}
