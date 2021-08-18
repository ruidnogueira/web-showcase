import { NotificationPosition } from 'app/common/components/notification/notification.types';

export const constants = {
  defaultInputMaxLength: 255,
  defaultNotificationPosition: NotificationPosition.TopRight,
};

export type Constants = typeof constants;
