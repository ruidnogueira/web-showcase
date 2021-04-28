import { Button } from 'app/common/components/button/Button';
import { Field } from 'app/common/components/form/Field';
import { Label } from 'app/common/components/form/Label';
import { Input } from 'app/common/components/input/Input';
import { useConfig } from 'app/core/configs/ConfigProvider';
import { ColorVariant } from 'app/core/models/styles.model';
import { useTranslation } from 'react-i18next';
import styles from './LoginCard.module.scss';
import sharedStyles from '../LoggedOutShared.module.scss';
import classNames from 'classnames';
import { useLoginCard } from './useLoginCard';
import { ChangeEvent, FormEvent } from 'react';
import { LoginError, LoginForm } from './login.types';

export interface LoginCardProps {
  className?: string;
}

export interface LoginCardPresentationProps extends LoginCardProps {
  values: LoginForm;
  error?: LoginError;
  isSubmitting?: boolean;
  onChange: (event: ChangeEvent<HTMLElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function LoginCard(props: LoginCardProps) {
  const { isSubmitting, error, values, handleChange, handleSubmit } = useLoginCard();

  return (
    <LoginCardPresentation
      {...props}
      isSubmitting={isSubmitting}
      error={error}
      values={values}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}

const prefix = 'login_card-';

const ids = {
  email: prefix + 'email',
  password: prefix + 'password',
};

export function LoginCardPresentation({
  className,
  error,
  isSubmitting,
  values,
  onChange,
  onSubmit,
}: LoginCardPresentationProps) {
  const { constants } = useConfig();
  const { t } = useTranslation();

  return (
    <div className={classNames(styles.card, className)}>
      <h1 className={sharedStyles.title}>{t('pages.login.title')}</h1>

      <form className={styles.form} onSubmit={onSubmit}>
        {error === LoginError.Invalid && (
          <ErrorMessage message={t('pages.login.errors.invalidLogin')} />
        )}
        {error === LoginError.Unexpected && (
          <ErrorMessage message={t('pages.login.errors.unexpected')} />
        )}

        <Field className={styles.field}>
          <Label htmlFor={ids.email}>{t('props.user.email')}</Label>
          <Input
            id={ids.email}
            name="email"
            type="email"
            className="input"
            maxLength={constants.defaultInputMaxLength}
            disabled={isSubmitting}
            value={values.email}
            onChange={onChange}
          />
        </Field>

        <Field className={styles.field}>
          <Label htmlFor={ids.password}>{t('props.user.password')}</Label>
          <Input
            id={ids.password}
            name="password"
            type="password"
            className="input"
            maxLength={constants.defaultInputMaxLength}
            disabled={isSubmitting}
            value={values.password}
            onChange={onChange}
          />
        </Field>

        <Button type="submit" variant={ColorVariant.Primary} isLoading={isSubmitting}>
          {t('pages.login.submit')}
        </Button>
      </form>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className={classNames('help help--error', styles.error)} role="alert">
      {message}
    </div>
  );
}
