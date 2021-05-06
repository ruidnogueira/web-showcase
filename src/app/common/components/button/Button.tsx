import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import { ColorVariant, ControlSize } from 'app/core/models/styles.model';
import { Spinner } from '../spinner/Spinner';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: 'submit' | 'reset' | 'button';

  /**
   * The visual variant of the button
   */
  variant?: ColorVariant;

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
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={classNames(
        'button',
        { [`button--${variant}`]: variant, [`button--${size}`]: size },
        className
      )}
      disabled={disabled || isLoading}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
}
