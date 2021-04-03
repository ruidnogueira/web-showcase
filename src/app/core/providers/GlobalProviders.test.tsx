import { render } from '@testing-library/react';
import { ConfigProvider } from '../configs/ConfigProvider';
import { GlobalProviders } from './GlobalProviders';

test('renders', () => {
  render(
    <ConfigProvider>
      <GlobalProviders>children</GlobalProviders>
    </ConfigProvider>
  );
});
