import { createContext, ReactNode, useContext, useMemo } from 'react';
import { useApiClient } from '../ApiProvider';
import { AuthService, createAuthService } from './authService';

interface ApiServices {
  authService: AuthService;
}

const ApiServicesContext = createContext<ApiServices | undefined>(undefined);

export function ApiServicesProvider({ children }: { children: ReactNode }) {
  const api = useApiClient();

  const services: ApiServices = useMemo(
    () => ({
      authService: createAuthService({ api }),
    }),
    [api]
  );

  return <ApiServicesContext.Provider value={services}>{children}</ApiServicesContext.Provider>;
}

export function useApiServices() {
  const context = useContext(ApiServicesContext);

  if (context === undefined) {
    throw new Error('useApiServices must be used within ApiServicesContext');
  }

  return context;
}
