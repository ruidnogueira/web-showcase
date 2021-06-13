import { forwardRef, HTMLAttributes } from 'react';
import classNames from 'classnames';

export const Field = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div {...props} ref={ref} className={classNames('field', className)} />;
  }
);
