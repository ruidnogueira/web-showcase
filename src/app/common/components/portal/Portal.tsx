import { useTheme } from 'app/core/providers/ThemeProvider';
import classNames from 'classnames';
import { HTMLAttributes, ReactNode, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// TODO TEST
// TODO STORYBOOK

export interface PortalProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Portal({ children, className, ...props }: PortalProps) {
  const { theme } = useTheme();
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
    <div className={classNames(className, `theme--${theme}`)} {...props}>
      {children}
    </div>,
    container
  );
}
