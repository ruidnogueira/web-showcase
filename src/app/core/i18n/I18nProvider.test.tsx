import { render } from '@testing-library/react';
import { ConfigProvider } from '../configs/ConfigProvider';
import { I18nProvider } from './I18nProvider';

test('renders', () => {
  render(
    <ConfigProvider>
      <I18nProvider>children</I18nProvider>
    </ConfigProvider>
  );
});
