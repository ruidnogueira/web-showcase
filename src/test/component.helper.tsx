import { ReactElement, ComponentType } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, MemoryRouterProps } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import { createI18nMock } from '../mocks/i18n.mock';
import { GlobalProviders } from 'app/core/providers/GlobalProviders';
import { ConfigProvider } from 'app/core/configs/ConfigProvider';

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
      <I18nextProvider i18n={createI18nMock()}>
        <ConfigProvider>
          <GlobalProviders>{Wrapper ? <Wrapper>{children}</Wrapper> : children}</GlobalProviders>
        </ConfigProvider>
      </I18nextProvider>
    </MemoryRouter>
  );

  return render(ui, { wrapper: AllProviders });
}
