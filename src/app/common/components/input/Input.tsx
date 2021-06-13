import { forwardRef, InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import { ColorVariant, ControlSize } from 'app/core/models/styles.model';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * The color variant of the input
   */
  color?: ColorVariant;

  /**
   * The size of the input
   */
  size?: ControlSize;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, color, size, ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        className={classNames(
          'input',
          { [`input--${color}`]: color, [`input--${size}`]: size },
          className
        )}
      />
    );
  }
);
