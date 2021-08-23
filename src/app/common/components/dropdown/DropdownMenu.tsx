import { mergeRefs } from 'app/common/utils/ref.util';
import {
  Children,
  cloneElement,
  EventHandler,
  forwardRef,
  HTMLAttributes,
  LiHTMLAttributes,
  MouseEvent,
  ReactElement,
  RefAttributes,
  useLayoutEffect,
  useRef,
} from 'react';

type TriggerElement = ReactElement<HTMLAttributes<HTMLElement> & RefAttributes<HTMLElement>>;

export interface DropdownMenuProps {
  children: ReactElement<DropdownMenuItemProps> | ReactElement<DropdownMenuItemProps>[];
  className?: HTMLAttributes<HTMLUListElement>['className'];
  style?: HTMLAttributes<HTMLUListElement>['style'];
  id?: HTMLAttributes<HTMLUListElement>['id'];
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

export interface DropdownMenuItemProps {
  children: TriggerElement;
  className?: LiHTMLAttributes<HTMLLIElement>['className'];
  style?: LiHTMLAttributes<HTMLLIElement>['style'];
  onClick?: EventHandler<MouseEvent<HTMLElement>>;
}

// TODO IS OPEN

export function DropdownMenu({ children, onClick, ...props }: DropdownMenuProps) {
  const menuRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const items = Children.toArray(children) as ReactElement<
    DropdownMenuItemProps & RefAttributes<HTMLLIElement>
  >[];

  useLayoutEffect(() => {
    const firstActiveItemIndex = items.findIndex((item) => item); // TODO FILTER ACTIVE ITEMS

    if (firstActiveItemIndex === -1) {
      focus(menuRef.current);
    } else {
      focus(itemRefs.current[firstActiveItemIndex]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ul ref={menuRef} {...props}>
      {items.map((item, index) =>
        cloneElement(item, {
          ref: mergeRefs((element) => (itemRefs.current[index] = element), item.props.ref),

          onClick: (event: MouseEvent<HTMLElement>) => {
            onClick?.(event);
            item.props.onClick?.(event);
          },
        })
      )}
    </ul>
  );
}

export const DropdownMenuItem = forwardRef<HTMLElement, DropdownMenuItemProps>(
  ({ children, onClick, ...props }, ref) => {
    const item = cloneElement(children, {
      ref: mergeRefs(ref, children.props.ref),

      onClick: (event: MouseEvent<HTMLElement>) => {
        onClick?.(event);
        children.props.onClick?.(event);
      },
    });

    return <li {...props}>{item}</li>;
  }
);

function focus(element?: HTMLElement | null) {
  element?.focus({ preventScroll: true });
}
