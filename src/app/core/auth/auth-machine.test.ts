import { getFromLocalStorage, saveToLocalStorage } from 'app/common/utils/browser.util';
import { mockAuthToken } from 'mocks/model/user.mock';
import { interpret } from 'xstate';
import { storageKeys } from '../configs/storage.config';
import { authEvents, AuthMachineStateValue, createAuthMachine } from './auth-machine';

test(`reaches ${AuthMachineStateValue.LoggedOut} state if user data is not in local storage`, () => {
  const machine = createAuthMachine({ storageKeys });
  const service = interpret(machine).start();

  expect(service.state.matches(AuthMachineStateValue.LoggedOut)).toBe(true);
});

test(`reaches ${AuthMachineStateValue.LoggedIn} state if user data is in local storage`, () => {
  saveToLocalStorage(storageKeys.authToken, mockAuthToken());

  const machine = createAuthMachine({ storageKeys });
  const service = interpret(machine).start();

  expect(service.state.matches(AuthMachineStateValue.LoggedIn)).toBe(true);
});

test(`reaches ${AuthMachineStateValue.LoggedIn} state via ${authEvents.login.name}`, () => {
  const machine = createAuthMachine({ storageKeys });
  const service = interpret(machine).start();

  service.send(authEvents.login(mockAuthToken()));

  expect(service.state.matches(AuthMachineStateValue.LoggedIn)).toBe(true);
});

test(`reaches ${AuthMachineStateValue.LoggedOut} state via ${authEvents.logout.name}`, () => {
  saveToLocalStorage(storageKeys.authToken, mockAuthToken());

  const machine = createAuthMachine({ storageKeys });
  const service = interpret(machine).start();

  service.send(authEvents.logout());

  expect(service.state.matches(AuthMachineStateValue.LoggedOut)).toBe(true);
});

test('clears user data from local storage when logging out', () => {
  saveToLocalStorage(storageKeys.authToken, mockAuthToken());

  const machine = createAuthMachine({ storageKeys });
  const service = interpret(machine).start();

  service.send(authEvents.logout());

  expect(getFromLocalStorage<string>(storageKeys.authToken)).toBeUndefined();
});
