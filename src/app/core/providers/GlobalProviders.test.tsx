import { renderWithProviders } from 'test/component.helper';
import { GlobalProviders } from './GlobalProviders';

test('renders', () => {
  const { container } = renderWithProviders(<GlobalProviders>children</GlobalProviders>);

  expect(container).toBeInTheDocument();
});
