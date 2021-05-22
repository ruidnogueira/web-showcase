import { ReactNode } from 'react';
import { NotificationPosition } from './Notification';

export type NotificationId = number | string;

export interface NotificationConfig {
  id: NotificationId;
  message: ReactNode;
  position: NotificationPosition;
  duration?: number;
  isClosable?: boolean;
  onClose: () => void;
}
