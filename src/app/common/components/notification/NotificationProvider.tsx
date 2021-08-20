import { createContext, ReactNode, useContext, useMemo, useRef, useState } from 'react';
import { NotificationConfig, NotificationId, NotificationPosition } from './Notification.types';
import { NotificationManager } from './NotificationManager';
import { v4 as uuid } from 'uuid';
import { Portal } from '../portal/Portal';

type NotificationOptions = Pick<NotificationConfig, 'message' | 'duration' | 'isClosable'> &
  Partial<Pick<NotificationConfig, 'id' | 'position' | 'onClose'>>;

interface NotificationMethods {
  open: (options: NotificationOptions) => void;
  close: (notificationId: NotificationId) => void;
  closeAll: () => void;
}

export interface NotificationProviderProps {
  children: ReactNode;
  defaultNotificationPosition?: NotificationPosition;
}

const NotificationContext = createContext<NotificationMethods | undefined>(undefined);

const portalId = 'notification-portal';

export function NotificationProvider({
  children,
  defaultNotificationPosition = NotificationPosition.TopRight,
}: NotificationProviderProps) {
  const notificationsRef = useRef<NotificationConfig[]>([]);
  const [notifications, setNotifications] = useState<NotificationConfig[]>([]);
  notificationsRef.current = notifications;

  const notificationActions = useMemo<NotificationMethods>(() => {
    return {
      open: ({ position, id, onClose, ...options }) => {
        const notificationId = id ?? uuid();

        const notification: NotificationConfig = {
          ...options,
          id: notificationId,
          position: position ?? defaultNotificationPosition,
          onClose: () => {
            const notificationsToKeep = notificationsRef.current.filter(
              (notification) => notification.id !== notificationId
            );

            notificationsRef.current = notificationsToKeep;
            setNotifications(notificationsToKeep);

            onClose?.();
          },
        };

        setNotifications((notifications) => notifications.concat(notification));
      },

      close: (notificationId) => {
        const currentNotifications = notificationsRef.current;
        const notificationsToKeep: NotificationConfig[] = [];

        for (const notification of currentNotifications) {
          if (notification.id === notificationId) {
            notification.onClose();
          } else {
            notificationsToKeep.push(notification);
          }
        }

        notificationsRef.current = notificationsToKeep;
        setNotifications(notificationsToKeep);
      },

      closeAll: () => {
        notificationsRef.current.forEach((notification) => notification.onClose());
        notificationsRef.current = [];
        setNotifications([]);
      },
    };
  }, [defaultNotificationPosition]);

  return (
    <>
      <Portal id={portalId}>
        <NotificationManager notifications={notifications}></NotificationManager>
      </Portal>

      <NotificationContext.Provider value={notificationActions}>
        {children}
      </NotificationContext.Provider>
    </>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);

  if (context === undefined) {
    throw new Error('useNotification must be used within NotificationProvider');
  }

  return context;
}
