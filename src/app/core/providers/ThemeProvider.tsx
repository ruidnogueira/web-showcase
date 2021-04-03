import { getFromLocalStorage, saveToLocalStorage } from 'app/common/utils/browser.util';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useConfig } from '../configs/ConfigProvider';

export type Theme = 'light' | 'dark';

const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void } | undefined>(
  undefined
);

export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: ReactNode;
  initialTheme?: Theme;
}) {
  const { storageKeys } = useConfig();

  const [theme, setTheme] = useState<Theme>(() => {
    if (initialTheme) {
      return initialTheme;
    }

    const savedTheme = getFromLocalStorage<Theme>(storageKeys.theme);
    if (savedTheme) {
      return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const themeState = useMemo(() => {
    const toggleTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      saveToLocalStorage(storageKeys.theme, newTheme);
      setTheme(newTheme);
    };

    return { theme, toggleTheme };
  }, [theme, storageKeys]);

  return (
    <>
      <Helmet>
        <html data-theme={theme} />
      </Helmet>
      <ThemeContext.Provider value={themeState}>{children}</ThemeContext.Provider>
    </>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}
