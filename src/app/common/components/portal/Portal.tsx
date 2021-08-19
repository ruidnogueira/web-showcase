import { ReactNode, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// TODO TEST
// TODO STORYBOOK

export interface PortalProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

export function Portal({ children, id, className }: PortalProps) {
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

  return createPortal(
    <div id={id} className={className}>
      {children}
    </div>,
    container
  );
}
