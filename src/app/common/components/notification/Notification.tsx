import VisuallyHidden from '@reach/visually-hidden';
import { forwardRef, ReactNode, useState } from 'react';
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

export const Notification = forwardRef<HTMLDivElement, NotificationProps>(function Notification(
  { className, children, isClosable, duration, onClose },
  ref
) {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  useTimeout(
    () => {
      onClose?.();
    },
    isHovered ? null : duration
  );

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <NotificationCard
      className={className}
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {isClosable && <CloseButton t={t} onClose={onClose} />}
    </NotificationCard>
  );
});

const NotificationCard = forwardRef<HTMLDivElement, NotificationCardProps>(
  function NotificationCard({ children, className, onMouseEnter, onMouseLeave }, ref) {
    return (
      <div
        className={classNames('notification', className)}
        role="alert"
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </div>
    );
  }
);

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
