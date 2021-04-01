import { ReactElement, ComponentType } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, MemoryRouterProps } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import { i18nMock } from './i18n.mock';
import { HelmetProvider } from 'react-helmet-async';

interface RenderOptions {
  wrapper?: ComponentType;
  routerProps?: MemoryRouterProps;
}

/**
 * Provides global providers required for smart components (i18n, routing, etc)
 */
export function renderWithProviders(ui: ReactElement, options: RenderOptions = {}) {
  const Wrapper = options.wrapper;

  const AllProviders: React.FC = ({ children }) => (
    <MemoryRouter {...options.routerProps}>
      <I18nextProvider i18n={i18nMock}>
        <HelmetProvider>{Wrapper ? <Wrapper>{children}</Wrapper> : children}</HelmetProvider>
      </I18nextProvider>
    </MemoryRouter>
  );

  return render(ui, { wrapper: AllProviders });
}
