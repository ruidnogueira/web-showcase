import { ReactNode } from 'react';

export type NotificationId = number | string;

export enum NotificationPosition {
  Top = 'top',
  TopLeft = 'top-left',
  TopRight = 'top-right',
  Bottom = 'bottom',
  BottomLeft = 'bottom-left',
  BottomRight = 'bottom-right',
}

export interface NotificationConfig {
  id: NotificationId;
  message: ReactNode;
  position: NotificationPosition;
  duration?: number;
  isClosable?: boolean;
  onClose: () => void;
}
