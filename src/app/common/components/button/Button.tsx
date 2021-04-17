import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import { ColorVariant, ControlSize } from 'app/core/models/styles.model';
import { Spinner } from '../spinner/Spinner';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: 'submit' | 'reset' | 'button';

  /**
   * Specifies the visual variant
   */
  variant?: ColorVariant;

  /**
   * Specifies the size
   */
  size?: ControlSize;

  /**
   * Specifies whether loading spinner is visible
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
