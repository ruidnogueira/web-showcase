import { InputHTMLAttributes } from 'react';
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

export function Input({ className, color, size, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={classNames(
        'input',
        { [`input--${color}`]: color, [`input--${size}`]: size },
        className
      )}
    />
  );
}
