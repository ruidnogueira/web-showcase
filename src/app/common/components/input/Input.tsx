import { InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import { ColorVariant, ControlSize } from 'app/core/models/styles.model';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * The visual variant of the input
   */
  variant?: ColorVariant;

  /**
   * The size of the input
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
