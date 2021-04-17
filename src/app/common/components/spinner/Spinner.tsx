import { ReactComponent as SpinnerSvg } from 'assets/svg/spinner.svg';
import { SVGAttributes } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { VisuallyHidden } from '@reach/visually-hidden';
import { ColorVariant } from 'app/core/models/styles.model';

export interface SpinnerProps extends SVGAttributes<SVGElement> {
  /**
   * Specifies the visual variant
   */
  variant?: ColorVariant;

  /**
   * Specifies whether spinner should be read by screen readers
   */
  isAlert?: boolean;
}

export function Spinner({ variant, isAlert, ...props }: SpinnerProps) {
  const { t } = useTranslation();

  return (
    <>
      <VisuallyHidden aria-busy={true} aria-live={isAlert ? 'assertive' : 'polite'}>
        {t('states.loading')}
      </VisuallyHidden>
      <SpinnerSvg
        {...props}
        className={classNames('spinner', {
          [`spinner--${variant}`]: variant,
        })}
        aria-hidden={true}
      />
    </>
  );
}
