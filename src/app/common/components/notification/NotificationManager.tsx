import { useTheme } from 'app/core/providers/ThemeProvider';
import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Notification } from './Notification';
import { NotificationConfig, NotificationPosition } from './notification.types';

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
          {notifications.map((notification) => (
            <NotificationContainer key={notification.id} {...notification} />
          ))}
        </ul>
      ))}
    </>
  );
}

function NotificationContainer({ id, message, position, onClose, ...props }: NotificationConfig) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);
  const handleClose = () => setIsMounted(false);

  // TODO TIMEOUT

  return (
    <li className="notification-container">
      <CSSTransition
        in={isMounted}
        timeout={3000}
        classNames={{
          enter: 'notification--enter',
          exit: 'notification--exit',
        }}
        onExited={onClose}
      >
        <Notification {...props} onClose={handleClose}>
          {message}
        </Notification>
      </CSSTransition>
    </li>
  );
}
