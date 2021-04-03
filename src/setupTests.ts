import '@testing-library/jest-dom';
import { server } from 'mocks/server/server.mock';
import 'test/globalMocks';

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
