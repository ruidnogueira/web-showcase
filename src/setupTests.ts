import '@testing-library/jest-dom';
import 'test/globalMocks';
import { server } from 'mocks/server/server.mock';
import { config } from 'react-transition-group';

config.disabled = true;

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  jest.clearAllMocks();

  localStorage.clear();
  sessionStorage.clear();

  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
