import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export interface HasServiceWorkerUpdateMessage {
  type: 'HAS_SERVICE_WORKER_UPDATE';
}

export interface UpdateServiceWorkerMessage {
  type: 'UPDATE_SERVICE_WORKER';
}

export const ServiceWorkerUpdateContext = createContext<boolean | undefined>(undefined);

export function ServiceWorkerUpdateProvider({ children }: { children: ReactNode }) {
  const [hasUpdate, setHasUpdate] = useState(false);

  useEffect(() => {
    const checkIfUpdated = (message: MessageEvent<any>) => {
      if (message.data?.type === 'HAS_SERVICE_WORKER_UPDATE') {
        setHasUpdate(true);
      }
    };

    window.addEventListener('message', checkIfUpdated);

    return () => window.removeEventListener('message', checkIfUpdated);
  }, []);

  return (
    <ServiceWorkerUpdateContext.Provider value={hasUpdate}>
      {children}
    </ServiceWorkerUpdateContext.Provider>
  );
}

export function useServiceWorkerUpdate() {
  const context = useContext(ServiceWorkerUpdateContext);

  if (context === undefined) {
    throw new Error('useServiceWorkerUpdateContext must be used within ServiceWorkerUpdateContext');
  }

  return context;
}
