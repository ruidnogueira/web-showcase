import { TestFixtures } from './fixture-types';
import { storageKeys } from '../../src/app/core/configs/storage.config';
import { mockAuthToken } from '../../src/mocks/model/user.mock';

export function createStorageFixture(): TestFixtures['storageState'] {
  return async ({ baseURL }, use) => {
    await use({
      origins: [
        {
          origin: baseURL!,
          localStorage: [
            {
              name: storageKeys.authToken,
              value: JSON.stringify(mockAuthToken()),
            },
          ],
        },
      ],
    });
  };
}
