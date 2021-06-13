import { forwardRef, LabelHTMLAttributes } from 'react';
import classNames from 'classnames';

export const Label = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <label {...props} ref={ref} className={classNames('label', className)}>
        {children}
      </label>
    );
  }
);
