import { useTheme } from 'app/core/providers/ThemeProvider';
import classNames from 'classnames';
import { useMemo } from 'react';
import { Notification, NotificationPosition } from './Notification';
import { NotificationConfig } from './notification.types';

type NotificationDictionary = Record<NotificationPosition, NotificationConfig[]>;

export function NotificationManager({ notifications }: { notifications: NotificationConfig[] }) {
  const { theme } = useTheme();

  const groupedNotifications = useMemo(() => {
    const notificationDictionary = notifications.reduce<NotificationDictionary>(
      (dictionary, notification) => {
        if (dictionary[notification.position]) {
          dictionary[notification.position].push(notification);
        } else {
          dictionary[notification.position] = [notification];
        }

        return dictionary;
      },
      {} as NotificationDictionary
    );

    return Object.entries(notificationDictionary) as Array<
      [NotificationPosition, NotificationConfig[]]
    >;
  }, [notifications]);

  return (
    <>
      {groupedNotifications.map(([position, notifications]) => (
        <ul
          key={position}
          id={`notification-manager-${position}`}
          className={classNames(
            'notification-manager',
            `notification-manager--${position}`,
            `theme--${theme}`
          )}
        >
          {notifications.map(({ id, message, ...props }) => (
            <li key={id} className="notification-container">
              <Notification {...props}>{message}</Notification>
            </li>
          ))}
        </ul>
      ))}
    </>
  );
}
