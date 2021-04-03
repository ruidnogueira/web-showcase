import { renderHook, act } from '@testing-library/react-hooks';
import { saveToLocalStorage } from 'app/common/utils/browser.util';
import { ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ConfigProvider } from '../configs/ConfigProvider';
import { ThemeProvider, useTheme } from './ThemeProvider';
import { storageKeys } from 'app/core/configs/storage.config';

const DependenciesWrapper = ({ children }: { children: ReactNode }) => (
  <ConfigProvider>
    <HelmetProvider>{children}</HelmetProvider>
  </ConfigProvider>
);

const Wrapper = ({ children }: { children: ReactNode }) => (
  <DependenciesWrapper>
    <ThemeProvider>{children}</ThemeProvider>
  </DependenciesWrapper>
);

test('renders when provider exists', () => {
  const { result } = renderHook(() => useTheme(), {
    wrapper: Wrapper,
  });

  expect(result.error).toBeUndefined();
});

test('throws error if provider is missing', () => {
  const { result } = renderHook(() => useTheme(), {
    wrapper: DependenciesWrapper,
  });

  expect(result.error).toBeDefined();
});

test('sets light theme by default', () => {
  const { result } = renderHook(() => useTheme(), {
    wrapper: Wrapper,
  });

  expect(result.current.theme).toBe('light');
});

test('sets provided initial theme', () => {
  const { result } = renderHook(() => useTheme(), {
    wrapper: ({ children }) => (
      <DependenciesWrapper>
        <ThemeProvider initialTheme="dark">{children}</ThemeProvider>
      </DependenciesWrapper>
    ),
  });

  expect(result.current.theme).toBe('dark');
});

test('sets dark theme if user prefers dark color scheme', () => {
  jest.spyOn(window, 'matchMedia').mockImplementationOnce((query) => ({
    matches: query.includes('prefers-color-scheme: dark'),
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));

  const { result } = renderHook(() => useTheme(), {
    wrapper: Wrapper,
  });

  expect(result.current.theme).toBe('dark');
});

test.each(['light', 'dark'] as const)('sets %s theme if it is in storage', (theme) => {
  saveToLocalStorage(storageKeys.theme, theme);

  const { result } = renderHook(() => useTheme(), {
    wrapper: Wrapper,
  });

  expect(result.current.theme).toBe(theme);
});

test('toggle current theme', () => {
  const { result } = renderHook(() => useTheme(), {
    wrapper: ({ children }) => (
      <DependenciesWrapper>
        <ThemeProvider initialTheme="light">{children}</ThemeProvider>
      </DependenciesWrapper>
    ),
  });

  const initialTheme = result.current.theme;

  act(() => {
    result.current.toggleTheme();
  });

  const toggleTheme = result.current.theme;

  act(() => {
    result.current.toggleTheme();
  });

  expect(initialTheme).toBe('light');
  expect(toggleTheme).toBe('dark');
  expect(result.current.theme).toBe('light');
});
