import { MemoryRouter, MemoryRouterProps } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import { createI18nMock } from '../mocks/i18n.mock';
import { GlobalProviders } from 'app/core/providers/GlobalProviders';
import { ConfigProvider } from 'app/core/configs/ConfigProvider';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'app/core/providers/ThemeProvider';
import { renderHook, RenderHookOptions } from '@testing-library/react-hooks';

interface RenderOptions<Props> extends RenderHookOptions<Props> {
  routerProps?: MemoryRouterProps;
}

/**
 * Provides global providers required for hooks that require smart components (i18n, routing, etc)
 */
export function renderHookWithProviders<Props, Result>(
  callback: (props: Props) => Result,
  options: RenderOptions<Props> = {}
) {
  const Wrapper = options.wrapper;

  const AllProviders: React.FC<Props> = (props) => (
    <MemoryRouter {...options.routerProps}>
      <HelmetProvider>
        <ConfigProvider>
          <I18nextProvider i18n={createI18nMock()}>
            <ThemeProvider>
              <GlobalProviders>{Wrapper ? <Wrapper {...props} /> : props.children}</GlobalProviders>
            </ThemeProvider>
          </I18nextProvider>
        </ConfigProvider>
      </HelmetProvider>
    </MemoryRouter>
  );

  return renderHook(callback, { ...options, wrapper: AllProviders });
}
