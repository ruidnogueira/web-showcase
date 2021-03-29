import { FormatFunction } from 'i18next';
import { I18nConfig } from '../configs/i18n.config';
import { format as formatDate } from 'date-fns';

export const getI18nFormatter = (i18nConfig: I18nConfig): FormatFunction => (
  value,
  format,
  language
) => {
  if (!language) {
    return value;
  }

  if (typeof value === 'number') {
    return new Intl.NumberFormat(language).format(value);
  }

  if (!format) {
    return value;
  }

  if (value instanceof Date) {
    const locale = getDateLocale(language, i18nConfig);
    return formatDate(value, format, { locale });
  }

  return value;
};

function getDateLocale(language: string, i18nConfig: I18nConfig): Locale {
  const locale = getLocale(language, i18nConfig);
  if (locale) {
    return locale;
  }

  const localeWithoutCulture = getLocale(language.split('-')[0]!, i18nConfig);
  if (localeWithoutCulture) {
    return localeWithoutCulture;
  }

  return i18nConfig.fallbackDateLocale;
}

function getLocale(language: string, i18nConfig: I18nConfig) {
  return i18nConfig.dateLocales[language];
}
