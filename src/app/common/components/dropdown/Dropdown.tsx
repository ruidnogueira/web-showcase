import { mergeRefs } from 'app/common/utils/ref.util';
import { cloneElement, ReactElement, Ref, useState } from 'react';
import { usePopper } from 'react-popper';

// TODO TEST
// TODO CHECK RERENDERS

export interface DropdownProps {
  children: (ReactElement & { ref?: Ref<HTMLElement> }) | string;
}

export function Dropdown({ children }: DropdownProps) {
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [{ name: 'offset', options: { offset: [0, 20] } }],
  });

  const trigger =
    typeof children === 'string' ? (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      <span tabIndex={0}>{children}</span>
    ) : (
      cloneElement(children, {
        ref: mergeRefs(setReferenceElement, children.ref),
      })
    );

  return (
    <>
      {trigger}

      <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
        Popper element
      </div>
    </>
  );
}
