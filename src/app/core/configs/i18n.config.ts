import { enUS, enGB, pt } from 'date-fns/locale';

const dateLocales: Record<string, Locale> = {
  en: enGB,
  'en-US': enUS,
  pt,
};

export const i18nConfig = {
  localStorageKey: 'appLanguage',
  fallbackLanguage: 'en-GB',
  fallbackDateLocale: enGB,
  dateLocales,
  supportedLanguages: [
    { code: 'en-GB', name: 'English (GB)' },
    { code: 'en-US', name: 'English (US)' },
    { code: 'pt-PT', name: 'Português (Portugal)' },
  ],
};

export type I18nConfig = typeof i18nConfig;
