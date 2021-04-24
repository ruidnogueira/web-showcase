import { ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ApiProvider } from '../api/ApiProvider';
import { AuthMachineProvider } from '../auth/AuthMachineProvider';
import { ThemeProvider } from './ThemeProvider';

export function GlobalProviders({ children }: { children: ReactNode }) {
  return (
    <HelmetProvider>
      <ApiProvider>
        <ThemeProvider>
          <AuthMachineProvider>{children}</AuthMachineProvider>
        </ThemeProvider>
      </ApiProvider>
    </HelmetProvider>
  );
}
