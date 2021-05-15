import { HTMLAttributes } from 'react';
import classNames from 'classnames';

export function Field({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={classNames('field', className)} />;
}
