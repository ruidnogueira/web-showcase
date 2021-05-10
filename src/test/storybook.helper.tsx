import { MemoryRouter } from 'react-router-dom';
import { MemoryRouterProps } from 'react-router';
import { GlobalProviders } from 'app/core/providers/GlobalProviders';
import { ReactNode } from 'react';

interface RenderProps {
  children: ReactNode;
  routerProps?: MemoryRouterProps;
}

/**
 * Provides global providers required for smart components (routing, etc)
 */
export function StorybookGlobalProviders(props: RenderProps) {
  return (
    <MemoryRouter {...props.routerProps}>
      <GlobalProviders>{props.children}</GlobalProviders>
    </MemoryRouter>
  );
}

export function StorybookVariants({ children }: { children: ReactNode }) {
  return <div style={{ display: 'flex', gap: '10px' }}>{children}</div>;
}
