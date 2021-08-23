import { useId } from 'app/common/hooks/use-id';
import { mergeRefs } from 'app/common/utils/ref.util';
import {
  cloneElement,
  HTMLAttributes,
  ReactElement,
  useState,
  MouseEvent,
  RefAttributes,
} from 'react';
import { Popper } from '../popper/Popper';
import { DropdownMenu, DropdownMenuItem, DropdownMenuProps } from './DropdownMenu';

// TODO TEST
// TODO CHECK RERENDERS
// TODO CHECK IF USELAYOUTEFFECT IS NEEDED
// TODO CLEANUP
// TODO CLOSE ON CLICK OUTSIDE DROPDOWN

type TriggerElement = ReactElement<HTMLAttributes<HTMLElement> & RefAttributes<HTMLElement>>;

export interface DropdownProps {
  children: TriggerElement;
  menu: ReactElement<DropdownMenuProps>;
}

export function Dropdown({ children, menu }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleDropdown = () => setIsOpen((isOpen) => !isOpen);

  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);

  const menuId = useId({ id: menu.props.id, prefix: 'dropdown-menu' });

  const trigger = cloneElement(children, {
    ref: mergeRefs(setReferenceElement, children.props.ref),

    'aria-expanded': isOpen,
    'aria-controls': menuId,
    'aria-haspopup': 'menu',

    onClick: (event: any) => {
      handleToggleDropdown();
      children.props.onClick?.(event);
    },
  });

  const menuClone = cloneElement(menu, {
    onClick: (event: MouseEvent<HTMLElement>) => {
      handleToggleDropdown();
      menu.props.onClick?.(event);
    },
  });

  return (
    <>
      {trigger}

      <Popper id={menuId} isOpen={isOpen} referenceElement={referenceElement}>
        {menuClone}
      </Popper>
    </>
  );
}

Dropdown.Menu = DropdownMenu;
Dropdown.MenuItem = DropdownMenuItem;
