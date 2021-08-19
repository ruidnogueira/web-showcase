import { HTMLAttributes, ReactNode, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// TODO TEST
// TODO STORYBOOK

export interface PortalProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Portal({ children, ...props }: PortalProps) {
  const [container, setContainer] = useState<HTMLDivElement>();

  useLayoutEffect(() => {
    const element = document.createElement('div');
    document.body.appendChild(element);
    setContainer(element);

    return () => element.remove();
  }, []);

  if (!container) {
    return null;
  }

  return createPortal(<div {...props}>{children}</div>, container);
}
