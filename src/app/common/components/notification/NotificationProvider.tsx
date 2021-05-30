import {
  createContext,
  ReactNode,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { NotificationConfig, NotificationId, NotificationPosition } from './notification.types';
import { NotificationManager } from './NotificationManager';
import { v4 as uuid } from 'uuid';

type NotificationOptions = Pick<NotificationConfig, 'message' | 'duration' | 'isClosable'> &
  Partial<Pick<NotificationConfig, 'id' | 'position' | 'onClose'>>;

interface NotificationMethods {
  open: (options: NotificationOptions) => void;
  close: (notificationId: NotificationId) => void;
  closeAll: () => void;
}

const NotificationContext = createContext<NotificationMethods | undefined>(undefined);

const portalId = 'notification-portal';

export function NotificationProvider({ children }: { children: ReactNode }) {
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
          position: position ?? NotificationPosition.TopRight, // TODO useConfig
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
  }, []);

  return (
    <>
      <NotificationPortal>
        <NotificationManager notifications={notifications}></NotificationManager>
      </NotificationPortal>

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

function NotificationPortal({ children }: { children: ReactNode }) {
  const outletElement = useMemo(() => {
    const element = document.createElement('div');
    element.id = portalId;
    return element;
  }, []);

  useLayoutEffect(() => {
    document.body.querySelector(`#${portalId}`)?.remove();
    document.body.appendChild(outletElement);
  }, [outletElement]);

  return createPortal(children, outletElement);
}
