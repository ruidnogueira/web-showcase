import { ReactNode } from 'react';

export interface NotificationProps {
  children: ReactNode;
}

export function Notification({ children }: NotificationProps) {
  return <div className="notification">{children}</div>;
}
