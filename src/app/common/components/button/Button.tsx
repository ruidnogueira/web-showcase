import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import { ColorVariant, ControlSize } from 'app/core/models/styles.model';

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
}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={classNames(
        'button',
        { [`button--${variant}`]: variant, [`button--${size}`]: size },
        className
      )}
    />
  );
}
