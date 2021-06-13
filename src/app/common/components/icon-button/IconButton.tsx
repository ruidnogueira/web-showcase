import classNames from 'classnames';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Button, ButtonProps } from '../button/Button';

export enum IconButtonVariant {
  Transparent = 'transparent',
  Filled = 'filled',
}

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  Pick<ButtonProps, 'type' | 'color' | 'size' | 'isLoading'> & { variant?: IconButtonVariant };

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, color, variant = IconButtonVariant.Transparent, ...props }, ref) => {
    return (
      <Button
        {...props}
        ref={ref}
        color={IconButtonVariant.Filled ? color : undefined}
        className={classNames(
          'button--icon-button',
          { 'button--transparent': variant === IconButtonVariant.Transparent },
          className
        )}
      />
    );
  }
);
