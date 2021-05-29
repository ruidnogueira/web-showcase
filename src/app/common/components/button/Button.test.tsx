import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { Button } from './Button';
import * as stories from './Button.stories';
import { createI18nMock } from 'mocks/i18n.mock';
import { composeStories } from '@storybook/testing-react';

const { Default, Disabled, Loading, Small } = composeStories(stories);

test.each([
  ['Default', Default],
  ['Disabled', Disabled],
  ['Small', Small],
  ['Loading', Loading],
])('renders %s story', (_, Component) => {
  render(
    <I18nextProvider i18n={createI18nMock()}>
      <Component />
    </I18nextProvider>
  );
});

test('is disabled when loading', () => {
  render(
    <I18nextProvider i18n={createI18nMock()}>
      <Button isLoading>Test Button</Button>
    </I18nextProvider>
  );

  expect(screen.getByRole('button')).toBeDisabled();
});
