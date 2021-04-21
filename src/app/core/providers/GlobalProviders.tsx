import { ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AuthenticationMachineProvider } from '../auth/AuthenticationMachineProvider';
import { ThemeProvider } from './ThemeProvider';

export function GlobalProviders({ children }: { children: ReactNode }) {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthenticationMachineProvider>{children}</AuthenticationMachineProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
