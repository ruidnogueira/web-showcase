import { InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import { ColorVariant, ControlSize } from 'app/core/models/styles.model';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Specifies the visual variant
   */
  variant?: ColorVariant;

  /**
   * Specifies the size
   */
  size?: ControlSize;
}

export function Input({ className, variant, size, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={classNames(
        'input',
        { [`input--${variant}`]: variant, [`input--${size}`]: size },
        className
      )}
    />
  );
}
