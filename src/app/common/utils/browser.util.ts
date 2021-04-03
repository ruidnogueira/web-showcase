export const getFromLocalStorage = <T>(key: string) => getFromStorage<T>(localStorage, key);
export const saveToLocalStorage = <T>(key: string, item: T) =>
  saveToStorage<T>(localStorage, key, item);

export const getFromSessionStorage = <T>(key: string) => getFromStorage<T>(sessionStorage, key);
export const saveToSessionStorage = <T>(key: string, item: T) =>
  saveToStorage<T>(sessionStorage, key, item);

/**
 * Gets item from session storage, if it does not exist gets from local storage
 */
export const getFromEitherStorage = <T>(key: string) =>
  getFromSessionStorage<T>(key) ?? getFromLocalStorage<T>(key);

const getFromStorage = <T>(storage: Storage, key: string): T | undefined => {
  try {
    const serializedItem = storage.getItem(key);
    if (serializedItem === null) {
      return undefined;
    }

    return JSON.parse(serializedItem);
  } catch {
    // did not find a way to test with jsdom
    // istanbul ignore next
    return undefined;
  }
};

const saveToStorage = <T>(storage: Storage, key: string, item: T) => {
  try {
    const serializedItem = JSON.stringify(item);
    storage.setItem(key, serializedItem);
  } catch {
    // Do nothing if we can't write to local storage
  }
};
