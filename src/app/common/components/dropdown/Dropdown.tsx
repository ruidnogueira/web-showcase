import { useId } from 'app/common/hooks/use-id';
import { mergeRefs } from 'app/common/utils/ref.util';
import {
  cloneElement,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  Ref,
  useState,
  LiHTMLAttributes,
} from 'react';
import { Popper } from '../popper/Popper';

// TODO TEST
// TODO CHECK RERENDERS
// TODO CLEANUP
// TODO MENU COMPONENT SHOULD HAVE aria-haspopup="menu"
// TODO ADD ARIA-CONTROLS (create unique ids instead of forcing a prop with the id?)
// TODO CLOSE ON CLICK OUTSIDE DROPDOWN

type HTMLElementAttributes = HTMLAttributes<HTMLElement>;

type TriggerElement = ReactElement & {
  ref?: Ref<HTMLElement>;
  onClick?: HTMLElementAttributes['onClick'];
};

export interface DropdownProps {
  children: TriggerElement;
  menu?: ReactElement<DropdownMenuProps>;
}

export interface DropdownMenuProps extends HTMLAttributes<HTMLUListElement> {
  children: ReactElement<DropdownMenuItemProps> | ReactElement<DropdownMenuItemProps>[];
}

export interface DropdownMenuItemProps extends LiHTMLAttributes<HTMLLIElement> {
  children: ReactNode;
}

export function Dropdown({ children, menu }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);

  const menuId = useId({ prefix: 'dropdown-menu' });

  const handleToggleDropdown = () => setIsOpen((isOpen) => !isOpen);

  const trigger = cloneElement(children, {
    ref: mergeRefs(setReferenceElement, children.ref),

    'aria-expanded': isOpen,
    'aria-haspopup': 'menu',
    'aria-controls': menuId,

    onClick: (event: any) => {
      handleToggleDropdown();
      children.onClick?.(event);
    },
  });

  return (
    <>
      {trigger}

      <Popper id={menuId} isOpen={isOpen} referenceElement={referenceElement}>
        {menu}
      </Popper>
    </>
  );
}

Dropdown.Menu = (props: DropdownMenuProps) => <ul {...props} />;
Dropdown.MenuItem = (props: DropdownMenuItemProps) => <li {...props} />;
