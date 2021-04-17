import { MemoryRouter } from 'react-router-dom';
import { MemoryRouterProps } from 'react-router';
import { I18nProvider } from 'app/core/i18n/I18nProvider';
import { ConfigProvider } from 'app/core/configs/ConfigProvider';
import { GlobalProviders } from 'app/core/providers/GlobalProviders';
import { ReactNode } from 'react';

interface RenderProps {
  children: ReactNode;
  routerProps?: MemoryRouterProps;
}

/**
 * Provides global providers required for smart components (i18n, routing, etc)
 */
export function StorybookGlobalProviders(props: RenderProps) {
  return (
    <MemoryRouter {...props.routerProps}>
      <ConfigProvider>
        <I18nProvider>
          <GlobalProviders>{props.children}</GlobalProviders>
        </I18nProvider>
      </ConfigProvider>
    </MemoryRouter>
  );
}
