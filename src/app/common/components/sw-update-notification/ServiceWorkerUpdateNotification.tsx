import {
  UpdateServiceWorkerMessage,
  useServiceWorkerUpdate,
} from 'app/core/providers/ServiceWorkerUpdateProvider';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LinkButton } from '../link-button/LinkButton';
import { NotificationPosition } from '../notification/notification.types';
import { useNotification } from '../notification/NotificationProvider';
import styles from './ServiceWorkerUpdateNotification.module.scss';

// TODO TEST

export function useServiceWorkerUpdateNotification() {
  const hasUpdate = useServiceWorkerUpdate();
  const notification = useNotification();

  useEffect(() => {
    if (hasUpdate) {
      notification.open({
        message: <ServiceWorkerUpdateMessage />,
        position: NotificationPosition.Bottom,
        isClosable: true,
      });
    }
  }, [hasUpdate, notification]);
}

export function ServiceWorkerUpdateMessage() {
  const { t } = useTranslation();

  const handleUpdate = () => {
    const message: UpdateServiceWorkerMessage = { type: 'UPDATE_SERVICE_WORKER' };
    window.postMessage(message);
  };

  return (
    <>
      <span>{t('components.serviceWorkerUpdateNotification.message')}</span>

      <LinkButton className={styles.updateButton} onClick={handleUpdate}>
        {t('actions.update').toUpperCase()}
      </LinkButton>
    </>
  );
}
