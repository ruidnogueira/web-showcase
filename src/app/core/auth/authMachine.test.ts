import { saveToLocalStorage } from 'app/common/utils/browser.util';
import { mockAuthToken } from 'mocks/model/user.mock';
import { interpret } from 'xstate';
import { storageKeys } from '../configs/storage.config';
import { AuthMachineEventType, AuthMachineStateValue, createAuthMachine } from './authMachine';

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

test(`reaches ${AuthMachineStateValue.LoggedIn} state via ${AuthMachineEventType.Login}`, () => {
  const machine = createAuthMachine({ storageKeys });
  const service = interpret(machine).start();

  service.send({ type: AuthMachineEventType.Login, data: mockAuthToken() });

  expect(service.state.matches(AuthMachineStateValue.LoggedIn)).toBe(true);
});

test(`reaches ${AuthMachineStateValue.LoggedOut} state via ${AuthMachineEventType.Logout}`, () => {
  saveToLocalStorage(storageKeys.authToken, mockAuthToken());

  const machine = createAuthMachine({ storageKeys });
  const service = interpret(machine).start();

  service.send({ type: AuthMachineEventType.Logout });

  expect(service.state.matches(AuthMachineStateValue.LoggedOut)).toBe(true);
});
