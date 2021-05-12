import '../src/styles/styles.scss';
import React from 'react';
import isChromatic from 'chromatic/isChromatic';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeContext } from '../src/app/core/providers/ThemeProvider';
import { ConfigProvider } from '../src/app/core/configs/ConfigProvider';
import { I18nProvider } from '../src/app/core/i18n/I18nProvider';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      order: ['Atoms', 'Molecules', 'Organisms', 'Pages'],
    },
  },
  viewport: {
    viewports: {
      galaxyS9: {
        name: 'Galaxy S9/S9+',
        styles: {
          width: '360px',
          height: '740px',
        },
      },
    },
  },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: ['light', 'dark'],
    },
  },
};

export const decorators = [
  (Story, { globals }) => (
    <HelmetProvider>
      <ConfigProvider>
        <I18nProvider>
          <ThemeProvider theme={globals.theme}>
            <Story />
          </ThemeProvider>
        </I18nProvider>
      </ConfigProvider>
    </HelmetProvider>
  ),
  (Story, { globals, parameters }) =>
    isChromatic() ? (
      <>
        <ThemeWrapper theme="light" style={{ marginBottom: '10px' }} parameters={parameters}>
          <Story />
        </ThemeWrapper>
        <ThemeWrapper theme="dark" parameters={parameters}>
          <Story />
        </ThemeWrapper>
      </>
    ) : (
      <ThemeWrapper theme={globals.theme} parameters={parameters}>
        <Story />
      </ThemeWrapper>
    ),
];

function ThemeWrapper({ theme, children, style, parameters }) {
  return (
    <div
      data-theme={theme}
      style={{
        height: '100%',
        width: '100%',
        color: 'var(--color-text)',
        background: 'var(--color-background)',
        padding: parameters.layout === 'fullscreen' ? undefined : '1rem',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function ThemeProvider({ theme, children }) {
  return (
    <ThemeContext.Provider value={{ theme, setTheme: () => {} }}>{children}</ThemeContext.Provider>
  );
}
