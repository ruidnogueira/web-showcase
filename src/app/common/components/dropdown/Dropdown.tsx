import { mergeRefs } from 'app/common/utils/ref.util';
import { cloneElement, HTMLAttributes, ReactElement, ReactNode, Ref, useState } from 'react';
import { Popper } from '../popper/Popper';

// TODO TEST
// TODO CHECK RERENDERS
// TODO CLEANUP
// TODO MENU COMPONENT SHOULD HAVE aria-haspopup="menu"
// TODO ADD ARIA-CONTROLS (create unique ids instead of forcing a prop with the id?)

type HTMLElementAttributes = HTMLAttributes<HTMLElement>;

type TriggerElement = ReactElement & {
  ref?: Ref<HTMLElement>;
  onClick?: HTMLElementAttributes['onClick'];
  onBlur?: HTMLElementAttributes['onBlur'];
};

export interface DropdownProps {
  children: TriggerElement | string;
  overlay?: ReactNode;
}

// TODO RETHINK APPROACH TO HAVE DROPDOWNTRIGGER AND DROPDOWNOVERLAY CHILD COMPONENTS OF DROPDOWN

export function Dropdown({ children, overlay }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);

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

    'aria-expanded': isOpen,

    onClick: (event: any) => {
      handleToggleDropdown();
      trigger.onClick?.(event);
    },
  });

  return (
    <>
      {dropdownTrigger}

      <Popper isOpen={isOpen} referenceElement={referenceElement}>
        {overlay}
      </Popper>
    </>
  );
}
