import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';
import { Button, ButtonProps } from '../button/Button';

export enum IconButtonVariant {
  Transparent = 'transparent',
  Filled = 'filled',
}

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  Pick<ButtonProps, 'type' | 'color' | 'size' | 'isLoading'> & { variant?: IconButtonVariant };

export function IconButton({
  className,
  color,
  variant = IconButtonVariant.Transparent,
  ...props
}: IconButtonProps) {
  return (
    <Button
      {...props}
      color={IconButtonVariant.Filled ? color : undefined}
      className={classNames(
        'button--icon-button',
        { 'button--transparent': variant === IconButtonVariant.Transparent },
        className
      )}
    />
  );
}
