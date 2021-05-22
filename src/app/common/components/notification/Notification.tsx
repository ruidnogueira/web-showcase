import VisuallyHidden from '@reach/visually-hidden';
import { ReactNode, useState } from 'react';
import { X as CloseIcon } from 'react-feather';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { IconButton } from '../icon-button/IconButton';
import { ControlSize } from 'app/core/models/styles.model';
import { TFunction } from 'i18next';
import { useTimeout } from 'app/common/hooks/useTimeout';

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

  onMouseLeave: () => void;
  onMouseEnter: () => void;
}

export function Notification({
  className,
  children,
  isClosable,
  duration,
  onClose,
}: NotificationProps) {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  useTimeout(
    () => {
      onClose?.();
    },
    isHovered ? null : duration
  );

  const handleMouseEnter = () => {
    console.log('hello');
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    console.log('bye');
    setIsHovered(false);
  };

  return (
    <NotificationCard
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {isClosable && <CloseButton t={t} onClose={onClose} />}
    </NotificationCard>
  );
}

function NotificationCard({
  children,
  className,
  onMouseEnter,
  onMouseLeave,
}: NotificationCardProps) {
  return (
    <div
      className={classNames('notification', className)}
      role="alert"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
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
