import { ControlSize } from 'app/core/models/styles.model';
import { useTranslation } from 'react-i18next';
import { Select } from 'app/common/components/select/Select';
import styles from './LanguageSelect.module.scss';
import { useConfig } from 'app/core/configs/ConfigProvider';

export function LanguageSelect() {
  const { i18nConfig } = useConfig();
  const { i18n } = useTranslation();

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
  };

  return (
    <Select
      className={styles.languageSelect}
      size={ControlSize.Small}
      value={i18n.languages[0]}
      onChange={handleLanguageChange}
    >
      {i18nConfig.supportedLanguages.map((language) => (
        <Select.Option key={language.code} value={language.code}>
          {language.name}
        </Select.Option>
      ))}
    </Select>
  );
}
