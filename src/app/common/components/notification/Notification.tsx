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
  className?: string;
  children: ReactNode;

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
  className?: string;
  children: ReactNode;
}

export function Notification({ className, children, isClosable, onClose }: NotificationProps) {
  const { t } = useTranslation();

  return (
    <NotificationCard className={className}>
      {children}

      {isClosable && <CloseButton t={t} onClose={onClose} />}
    </NotificationCard>
  );
}

function NotificationCard({ children, className }: NotificationCardProps) {
  return <div className={classNames('notification', className)}>{children}</div>;
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
