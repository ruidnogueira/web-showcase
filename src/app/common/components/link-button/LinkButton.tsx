import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';
import { Button, ButtonProps } from '../button/Button';

export type LinkButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> &
  Pick<ButtonProps, 'type' | 'size'>;

export function LinkButton({ className, ...props }: LinkButtonProps) {
  return <Button {...props} className={classNames('button--link', className)} />;
}
