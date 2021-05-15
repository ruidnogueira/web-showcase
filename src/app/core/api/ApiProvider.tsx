import { createContext, ReactNode, useContext, useMemo } from 'react';
import { createApiClient } from './api';
import { ApiClient } from './api.types';
import { defaultJsonInterceptor } from './defaultJsonInterceptor';

const ApiContext = createContext<ApiClient | undefined>(undefined);

export function ApiProvider({ children }: { children: ReactNode }) {
  const apiClient = useMemo(() => createApiClient([defaultJsonInterceptor]), []);

  return <ApiContext.Provider value={apiClient}>{children}</ApiContext.Provider>;
}

export function useApiClient() {
  const context = useContext(ApiContext);

  if (context === undefined) {
    throw new Error('useApiClient must be used within ApiProvider');
  }

  return context;
}
