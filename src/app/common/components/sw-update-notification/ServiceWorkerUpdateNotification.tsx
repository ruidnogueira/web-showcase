import {
  UpdateServiceWorkerMessage,
  useServiceWorkerUpdate,
} from 'app/core/providers/ServiceWorkerUpdateProvider';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NotificationPosition } from '../notification/notification.types';
import { useNotification } from '../notification/NotificationProvider';

// TODO TEST

export function useServiceWorkerUpdateNotification() {
  const hasUpdate = useServiceWorkerUpdate();
  const notification = useNotification();

  useEffect(() => {
    if (hasUpdate) {
      notification.open({
        message: <ServiceWorkerUpdateNotification />,
        position: NotificationPosition.Bottom,
        isClosable: true,
      });
    }
  }, [hasUpdate, notification]);
}

export function ServiceWorkerUpdateNotification() {
  const { t } = useTranslation();

  const handleUpdate = () => {
    const message: UpdateServiceWorkerMessage = { type: 'UPDATE_SERVICE_WORKER' };
    window.postMessage(message);
  };

  return (
    <>
      <span>{t('components.serviceWorkerUpdateNotification.message')}</span>
      <button onClick={handleUpdate}>{t('actions.update').toUpperCase()}</button>
    </>
  );
}
