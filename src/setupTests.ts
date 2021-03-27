import '@testing-library/jest-dom';

afterEach(() => {
  jest.clearAllMocks();

  localStorage.clear();
  sessionStorage.clear();
});
