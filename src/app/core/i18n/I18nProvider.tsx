import { ReactNode, useEffect, useMemo } from 'react';
import i18next, { InitOptions } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { useConfig } from '../configs/ConfigProvider';
import { getI18nFormatter } from './i18nFormat';

export function I18nProvider({ children }: { children: ReactNode }) {
  const { i18nConfig } = useConfig();

  const i18n = useMemo(() => {
    const i18nInitOptions: InitOptions = {
      fallbackLng: i18nConfig.fallbackLanguage,
      debug: process.env.NODE_ENV === 'development',
      detection: {
        order: ['localStorage', 'navigator', 'path'],
        lookupLocalStorage: i18nConfig.localStorageKey,
      },
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
        format: getI18nFormatter(i18nConfig),
      },
    };

    return i18next.createInstance(i18nInitOptions);
  }, [i18nConfig]);

  useEffect(() => {
    i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init();
  }, [i18n]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
