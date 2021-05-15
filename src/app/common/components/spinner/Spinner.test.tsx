import { createI18nMock } from 'mocks/i18n.mock';
import { I18nextProvider } from 'react-i18next';
import { renderWithProviders } from 'test/component.helper';
import Story, { AcessibilityAlert, Default } from './Spinner.stories';

test.each([
  ['Default', Default],
  ['AcessibilityAlert', AcessibilityAlert],
])('renders %s story', (_, Component) => {
  renderWithProviders(
    <I18nextProvider i18n={createI18nMock()}>
      <Component {...Story.args} {...Component.args} />
    </I18nextProvider>
  );
});
