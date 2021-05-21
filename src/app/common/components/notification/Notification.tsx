import VisuallyHidden from '@reach/visually-hidden';
import { ReactNode } from 'react';
import { X as CloseIcon } from 'react-feather';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { IconButton } from '../icon-button/IconButton';
import { ControlSize } from 'app/core/models/styles.model';
import { TFunction } from 'i18next';

export enum NotificationPosition {
  Top = 'top',
  TopLeft = 'top-left',
  TopRight = 'top-right',
  Bottom = 'bottom',
  BottomLeft = 'bottom-left',
  BottomRight = 'bottom-right',
}

export interface NotificationProps {
  id: string;
  className?: string;
  children: ReactNode;

  status: 'success' | 'error';

  /**
   * The position of the notification on the page
   */
  position: NotificationPosition;

  /**
   * Whether to show close button or not
   */
  isClosable?: boolean;

  /**
   * Time in miliseconds before notification is closed.
   */
  duration?: number;

  /**
   * Callback when notification closes
   */
  onClose?: () => void;
}

interface NotificationCardProps {
  id: string;
  className?: string;
  children: ReactNode;
  position: NotificationPosition; // TODO IS THIS NEEDED?
}

export function Notification({
  id,
  className,
  children,
  position,
  isClosable,
  onClose,
}: NotificationProps) {
  const { t } = useTranslation();

  return (
    <NotificationCard id={id} className={className} position={position}>
      {children}

      {isClosable && <CloseButton t={t} onClose={onClose} />}
    </NotificationCard>
  );
}

function NotificationCard({ id, position, children, className }: NotificationCardProps) {
  return (
    <div id={id} className={classNames('notification', `notification--${position}`, className)}>
      {children}
    </div>
  );
}

function CloseButton({ t, onClose }: { t: TFunction; onClose?: () => void }) {
  return (
    <IconButton
      className="notification__close-button"
      type="button"
      size={ControlSize.Small}
      onClick={onClose}
    >
      <VisuallyHidden>{t('actions.close')}</VisuallyHidden>
      <CloseIcon />
    </IconButton>
  );
}
