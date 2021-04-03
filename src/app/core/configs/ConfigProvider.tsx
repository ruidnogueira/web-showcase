import { createContext, ReactNode, useContext, useMemo } from 'react';
import { I18nConfig, i18nConfig } from './i18n.config';
import { storageKeys, StorageKeys } from './storage.config';

export interface GlobalConfig {
  i18nConfig: I18nConfig;
  storageKeys: StorageKeys;
}

const ConfigContext = createContext<GlobalConfig | undefined>(undefined);

export function ConfigProvider({
  children,
  config,
}: {
  children: ReactNode;
  config?: Partial<GlobalConfig>;
}) {
  const currentConfig: GlobalConfig = useMemo(
    () => ({
      i18nConfig,
      storageKeys: storageKeys,
      ...config,
    }),
    [config]
  );

  return <ConfigContext.Provider value={currentConfig}>{children}</ConfigContext.Provider>;
}

export function useConfig() {
  const context = useContext(ConfigContext);

  if (context === undefined) {
    throw new Error('useConfig must be used within ConfigProvider');
  }

  return context;
}
