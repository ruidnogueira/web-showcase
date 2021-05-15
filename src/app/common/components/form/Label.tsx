import { LabelHTMLAttributes } from 'react';
import classNames from 'classnames';

export function Label({ className, children, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label {...props} className={classNames('label', className)}>
      {children}
    </label>
  );
}
