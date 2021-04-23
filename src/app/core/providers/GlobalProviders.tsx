import { ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AuthMachineProvider } from '../auth/AuthMachineProvider';
import { ThemeProvider } from './ThemeProvider';

export function GlobalProviders({ children }: { children: ReactNode }) {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthMachineProvider>{children}</AuthMachineProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
