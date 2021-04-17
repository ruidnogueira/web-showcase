import { Button } from 'app/common/components/button/Button';
import { Field } from 'app/common/components/form/Field';
import { Label } from 'app/common/components/form/Label';
import { Input } from 'app/common/components/input/Input';
import { useConfig } from 'app/core/configs/ConfigProvider';
import { ColorVariant } from 'app/core/models/styles.model';
import { useTranslation } from 'react-i18next';
import loginStyles from './LoginCard.module.scss';
import pageStyles from './LoggedOut.module.scss';
import classNames from 'classnames';

export interface LoginCardPresentationProps {}

export function LoginCard() {
  return <LoginCard />;
}

const prefix = 'login_card-';

const ids = {
  email: prefix + 'email',
  password: prefix + 'password',
};

export function LoginCardPresentation() {
  const { constants } = useConfig();
  const { t } = useTranslation();

  return (
    <div className={classNames(pageStyles.card, loginStyles.card)}>
      <h1 className={pageStyles.title}>{t('pages.login.title')}</h1>

      <form className={loginStyles.form}>
        <Field className={loginStyles.field}>
          <Label htmlFor={ids.email}>{t('props.user.email')}</Label>
          <Input
            id={ids.email}
            name="email"
            type="email"
            className="input"
            maxLength={constants.defaultInputMaxLength}
          />
        </Field>

        <Field className={loginStyles.field}>
          <Label htmlFor={ids.password}>{t('props.user.password')}</Label>
          <Input
            id={ids.password}
            name="password"
            type="password"
            className="input"
            maxLength={constants.defaultInputMaxLength}
          />
        </Field>

        <Button type="submit" variant={ColorVariant.Primary}>
          {t('pages.login.submit')}
        </Button>
      </form>
    </div>
  );
}
