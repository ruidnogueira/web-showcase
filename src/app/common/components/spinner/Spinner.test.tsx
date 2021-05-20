import { createI18nMock } from 'mocks/i18n.mock';
import { I18nextProvider } from 'react-i18next';
import { renderWithProviders } from 'test/component.helper';
import * as stories from './Spinner.stories';
import { composeStories } from '@storybook/testing-react';

const { AcessibilityAlert, Default } = composeStories(stories);

test.each([
  ['Default', Default],
  ['AcessibilityAlert', AcessibilityAlert],
])('renders %s story', (_, Component) => {
  renderWithProviders(
    <I18nextProvider i18n={createI18nMock()}>
      <Component />
    </I18nextProvider>
  );
});
