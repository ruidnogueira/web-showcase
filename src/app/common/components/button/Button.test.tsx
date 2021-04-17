import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { Button, ButtonProps } from './Button';
import ButtonStory, { Default, Disabled, Loading, Small } from './Button.stories';
import { i18nMock } from 'mocks/i18n.mock';

test.each([
  ['Default', Default],
  ['Disabled', Disabled],
  ['Small', Small],
  ['Loading', Loading],
])('renders %s story', (_, Component) => {
  const props = { ...ButtonStory.args, ...Component.args } as ButtonProps;
  render(
    <I18nextProvider i18n={i18nMock}>
      <Component {...props} />
    </I18nextProvider>
  );
});

test('is disabled when loading', () => {
  render(
    <I18nextProvider i18n={i18nMock}>
      <Button type="button" isLoading>
        Test Button
      </Button>
    </I18nextProvider>
  );

  expect(screen.getByRole('button')).toBeDisabled();
});
