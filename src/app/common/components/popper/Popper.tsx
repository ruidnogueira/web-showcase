import { ReactNode, useState } from 'react';
import { usePopper } from 'react-popper';
import { Portal } from '../portal/Portal';

// TODO TEST
// TODO STORYBOOK

export interface PopperProps<T extends HTMLElement> {
  children: ReactNode;
  className?: string;
  isOpen?: boolean;
  referenceElement?: T | null;
}

export function Popper<T extends HTMLElement>({
  children,
  isOpen,
  referenceElement,
}: PopperProps<T>) {
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    modifiers: [{ name: 'offset', options: { offset: [0, 20] } }],
  });

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div ref={setPopperElement} style={{ ...styles.popper }} {...attributes.popper}>
        {children}
      </div>
    </Portal>
  );
}
