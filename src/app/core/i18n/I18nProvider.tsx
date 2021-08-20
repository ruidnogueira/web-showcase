import { ReactNode, useEffect } from 'react';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { useConfig } from '../configs/ConfigProvider';
import { getI18nFormatter } from './i18n-format';

export function I18nProvider({ children }: { children: ReactNode }) {
  const { i18nConfig } = useConfig();

  useEffect(() => {
    /* istanbul ignore next */
    if (i18next.isInitialized) {
      return;
    }

    i18next
      .use(Backend)
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        fallbackLng: i18nConfig.fallbackLanguage,
        debug: process.env.NODE_ENV === 'development',
        detection: {
          order: ['localStorage', 'navigator', 'path'],
          lookupLocalStorage: i18nConfig.localStorageKey,
        },
        backend: {
          loadPath: `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`,
        },
        interpolation: {
          escapeValue: false, // not needed for react as it escapes by default
          format: getI18nFormatter(i18nConfig),
        },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}
