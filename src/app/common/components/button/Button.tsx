import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import { ColorVariant, ControlSize } from 'app/core/models/styles.model';
import { Spinner } from '../spinner/Spinner';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: 'submit' | 'reset' | 'button';

  /**
   * The color variant of the button
   */
  color?: ColorVariant;

  /**
   * The size of the button
   */
  size?: ControlSize;

  /**
   * Whether the loading spinner is visible
   */
  isLoading?: boolean;
}

export function Button({
  children,
  disabled,
  isLoading,
  className,
  color,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={classNames(
        'button',
        { [`button--${color}`]: color, [`button--${size}`]: size },
        className
      )}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
    >
      {isLoading ? <Spinner className="button__spinner" /> : children}
    </button>
  );
}
