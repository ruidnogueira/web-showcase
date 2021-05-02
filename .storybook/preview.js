import '../src/styles/styles.scss';
import React from 'react';
import isChromatic from 'chromatic/isChromatic';

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
  (Story, { globals }) =>
    isChromatic() ? (
      <>
        <ThemeWrapper theme="light" style={{ marginBottom: '10px' }}>
          <Story />
        </ThemeWrapper>
        <ThemeWrapper theme="dark">
          <Story />
        </ThemeWrapper>
      </>
    ) : (
      <ThemeWrapper theme={globals.theme}>
        <Story />
      </ThemeWrapper>
    ),
];

function ThemeWrapper({ theme, children, style }) {
  return (
    <div className={'theme--' + theme} style={{ height: '100%', width: '100%', ...style }}>
      {children}
    </div>
  );
}
