import { render } from '@testing-library/react';
import { ConfigProvider } from '../configs/ConfigProvider';
import { GlobalProviders } from './GlobalProviders';

test('renders', () => {
  const { container } = render(
    <ConfigProvider>
      <GlobalProviders>children</GlobalProviders>
    </ConfigProvider>
  );

  expect(container).toBeInTheDocument();
});
