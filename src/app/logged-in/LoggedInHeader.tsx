import { IconButton } from 'app/common/components/icon-button/IconButton';
import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import styles from './LoggedInHeader.module.scss';
import { Menu as MenuIcon } from 'react-feather';
import VisuallyHidden from '@reach/visually-hidden';
import { useTranslation } from 'react-i18next';

export function LoggedInHeader(props: HTMLAttributes<HTMLElement>) {
  return (
    <header className={classNames(styles.header, props.className)}>
      <span className={styles.title}>{process.env.REACT_APP_NAME_SHORT.toUpperCase()}</span>

      <SettingsButton />
    </header>
  );
}

function SettingsButton() {
  // TODO MAKE DROPDOWN
  const { t } = useTranslation();

  const label = t('pages.home.settings.open');

  return (
    <IconButton title={label}>
      <VisuallyHidden>{label}</VisuallyHidden>
      <MenuIcon aria-hidden={true} />
    </IconButton>
  );
}
