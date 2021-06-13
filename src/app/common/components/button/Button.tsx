import { ButtonHTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames';
import { ColorVariant, ControlSize } from 'app/core/models/styles.model';
import { Spinner } from '../spinner/Spinner';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'submit' | 'reset' | 'button';

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

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, disabled, isLoading, className, color, size, type = 'button', ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        type={type}
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
);
