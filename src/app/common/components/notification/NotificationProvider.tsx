import { createContext, ReactNode, useContext, useLayoutEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { NotificationPosition } from './Notification';
import { NotificationConfig, NotificationId } from './notification.types';
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
  const [notifications, setNotifications] = useState<NotificationConfig[]>([]);

  const notificationActions = useMemo<NotificationMethods>(() => {
    const close = (notificationId: NotificationId) =>
      setNotifications((notifications) =>
        notifications.filter((notification) => notification.id !== notificationId)
      );

    return {
      open: ({ position, id, onClose, ...options }) => {
        const notificationId = id ?? uuid();

        const notification: NotificationConfig = {
          ...options,
          id: notificationId,
          position: position ?? NotificationPosition.TopRight, // TODO useConfig
          onClose: () => {
            close(notificationId);
            onClose?.();
          },
        };

        setNotifications((notifications) => notifications.concat(notification));
      },

      close,

      closeAll: () => setNotifications([]),
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
