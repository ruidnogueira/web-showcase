import { screen } from '@testing-library/react';
import { renderWithProviders } from 'test/component.helper';
import { App } from './App';

test('renders learn react link', () => {
  renderWithProviders(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
