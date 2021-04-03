import { renderHook } from '@testing-library/react-hooks';
import { ReactNode } from 'react';
import { ConfigProvider, GlobalConfig, useConfig } from './ConfigProvider';
import { i18nConfig } from './i18n.config';

test('renders when provider exists', () => {
  const { result } = renderHook(() => useConfig(), {
    wrapper: ConfigProvider,
  });

  expect(result.error).toBeUndefined();
});

test('throws error if provider is missing', () => {
  const { result } = renderHook(() => useConfig());

  expect(result.error).toBeDefined();
});

test('uses provided config', () => {
  const config: Partial<GlobalConfig> = {
    i18nConfig: {
      ...i18nConfig,
      supportedLanguages: [],
    },
  };

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <ConfigProvider config={config}>{children}</ConfigProvider>
  );

  const { result } = renderHook(() => useConfig(), {
    wrapper: Wrapper,
  });

  expect(result.current).toEqual(expect.objectContaining(config));
});
