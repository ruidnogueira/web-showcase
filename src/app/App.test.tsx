import { renderWithProviders } from 'test/component.helper';
import { screen } from '@testing-library/react';
import { App } from './App';
import { saveToLocalStorage } from './common/utils/browser.util';
import { mockAuthToken } from 'mocks/model/user.mock';
import { storageKeys } from './core/configs/storage.config';

test('renders', () => {
  const { container } = renderWithProviders(<App />);
  expect(container).toBeInTheDocument();
});

test('renders logged out page if user is not authenticated', () => {
  renderWithProviders(<App />);

  expect(screen.getByTestId('logged_out-page')).toBeInTheDocument();
});

test('renders logged in page if user is already authenticated', () => {
  saveToLocalStorage(storageKeys.authToken, mockAuthToken());

  renderWithProviders(<App />);

  expect(screen.getByTestId('logged_in-page')).toBeInTheDocument();
});
