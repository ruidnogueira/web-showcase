import { i18nConfig } from 'app/core/configs/i18n.config';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = i18nConfig.supportedLanguages.reduce<Record<string, {}>>(
  (resources, language) => {
    resources[language.code] = {};
    return resources;
  },
  {}
);

i18n.use(initReactI18next).init({
  fallbackLng: i18nConfig.fallbackLanguage,
  lng: i18nConfig.fallbackLanguage,

  debug: false,

  interpolation: {
    escapeValue: false, // not needed for react!!
  },

  react: {
    useSuspense: false,
  },

  resources,
});

export function createI18nMock() {
  return i18n.cloneInstance();
}
