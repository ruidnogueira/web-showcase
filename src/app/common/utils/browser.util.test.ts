import {
  saveToLocalStorage,
  saveToSessionStorage,
  getFromLocalStorage,
  getFromSessionStorage,
  getFromEitherStorage,
} from './browser.util';

describe.each([
  ['localStorage', localStorage, saveToLocalStorage, getFromLocalStorage],
  ['sessionStorage', sessionStorage, saveToSessionStorage, getFromSessionStorage],
])('%s', (_, storage, saveToStorage, getFromStorage) => {
  test('saves item', () => {
    const storageKey = 'testKey';
    const value = 'Test value';

    saveToStorage(storageKey, value);

    expect(storage.getItem(storageKey)).toEqual(JSON.stringify(value));
  });

  test('gets item', () => {
    const storageKey = 'testKey';
    const value = 'Test value';

    storage.setItem(storageKey, JSON.stringify(value));

    const result = getFromStorage(storageKey);

    expect(result).toEqual(value);
  });
});

describe('getFromEitherStorage', () => {
  test('gets from session storage if it has item', () => {
    const storageKey = 'testKey';
    const value = 'Test value';

    saveToSessionStorage(storageKey, value);

    const result = getFromEitherStorage(storageKey);

    expect(result).toEqual(value);
  });

  test('gets from local storage if session storage does not have item', () => {
    const storageKey = 'testKey';
    const value = 'Test value';

    saveToLocalStorage(storageKey, value);

    const result = getFromEitherStorage(storageKey);

    expect(result).toEqual(value);
  });

  test('returns undefined if no storage has item', () => {
    const storageKey = 'testKey';

    const result = getFromEitherStorage<string>(storageKey);

    expect(result).toBeUndefined();
  });
});
