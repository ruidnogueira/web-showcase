import { ReactElement, ComponentType } from 'react';
import { render } from '@testing-library/react';

interface RenderOptions {
  wrapper?: ComponentType;
}

/**
 * Provides global providers required for smart components (i18n, routing, etc)
 */
export function renderWithProviders(ui: ReactElement, options: RenderOptions = {}) {
  const Wrapper = options.wrapper;

  const AllProviders: React.FC = ({ children }) => (
    <>{Wrapper ? <Wrapper>{children}</Wrapper> : children}</>
  );

  return render(ui, { wrapper: AllProviders });
}
