import { mergeRefs } from 'app/common/utils/ref.util';
import { cloneElement, HTMLAttributes, ReactElement, Ref, useState } from 'react';
import { usePopper } from 'react-popper';
import { Portal } from '../portal/Portal';

// TODO TEST
// TODO CHECK RERENDERS
// TODO CLEANUP

type HTMLElementAttributes = HTMLAttributes<HTMLElement>;

type TriggerElement = ReactElement & {
  ref?: Ref<HTMLElement>;
  onClick?: HTMLElementAttributes['onClick'];
  onBlur?: HTMLElementAttributes['onBlur'];
};

export interface DropdownProps {
  children: TriggerElement | string;
}

export function Dropdown({ children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [{ name: 'offset', options: { offset: [0, 20] } }],
  });

  const handleToggleDropdown = () => setIsOpen((isOpen) => !isOpen);

  const trigger: TriggerElement =
    typeof children === 'string' ? (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      <span tabIndex={0}>{children}</span>
    ) : (
      children
    );

  const dropdownTrigger = cloneElement(trigger, {
    ref: mergeRefs(setReferenceElement, trigger.ref),
    onClick: (event: any) => {
      handleToggleDropdown();
      trigger.onClick?.(event);
    },
  });

  return (
    <>
      {dropdownTrigger}

      {isOpen && (
        <Portal>
          <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
            Popper element
          </div>
          ,
        </Portal>
      )}
    </>
  );
}
