import { Page } from 'playwright';
import { i18nConfig } from 'app/app/core/configs/i18n.config';
import { storageKeys } from 'app/app/core/configs/storage.config';
import { mockAuthToken } from 'app/mocks/model/user.mock';

/**
 * Sets application language
 *
 * **Warning: page must be refreshed**
 */
export function setLanguage(page: Page, language: string) {
  const { localStorageKey } = i18nConfig;

  return page.evaluate(
    ({ localStorageKey, language }) => {
      localStorage.setItem(localStorageKey, language);
    },
    { localStorageKey, language }
  );
}

/**
 * Sets current user.
 * Bypasses manual user login.
 *
 * **Warning: page must be refreshed**
 */
export function setCurrentUser(page: Page) {
  const token = mockAuthToken();
  const storageKey = storageKeys.authToken;

  return setLocalStorageItem(page, storageKey, token);
}

/**
 * Stringifies and sets item in local storage
 */
export function setLocalStorageItem(page: Page, key: string, item: unknown) {
  return page.evaluate(
    ({ key, item }) => {
      const serializedItem = JSON.stringify(item);
      localStorage.setItem(key, serializedItem);
    },
    { key, item }
  );
}
