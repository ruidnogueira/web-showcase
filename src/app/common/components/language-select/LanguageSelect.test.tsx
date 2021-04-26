import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { LanguageSelect } from './LanguageSelect';
import { ConfigProvider } from 'app/core/configs/ConfigProvider';
import { findBySelectSelection, selectOption } from 'test/select.helper';
import { i18nConfig } from 'app/core/configs/i18n.config';
import { act } from 'react-dom/test-utils';
import { createI18nMock } from 'mocks/i18n.mock';

const setup = () => {
  const i18nMock = createI18nMock();
  i18nMock.changeLanguage('en-GB');

  const result = render(
    <ConfigProvider
      config={{
        i18nConfig: {
          ...i18nConfig,
          supportedLanguages: [
            { code: 'en-GB', name: 'GB' },
            { code: 'en-US', name: 'US' },
            { code: 'pt-PT', name: 'PT' },
          ],
        },
      }}
    >
      <I18nextProvider i18n={i18nMock}>
        <LanguageSelect />
      </I18nextProvider>
    </ConfigProvider>
  );

  return { ...result, i18nMock };
};

test('renders', () => {
  const { container } = setup();
  expect(container).toBeInTheDocument();
});

test('changes language when new option is selected', async () => {
  const { i18nMock } = setup();

  expect(await findBySelectSelection(document.body, { name: 'GB' })).toBeInTheDocument();

  selectOption(document.body, 'PT');
  expect(await findBySelectSelection(document.body, { name: 'PT' })).toBeInTheDocument();

  expect(i18nMock.languages[0]).toBe('pt-PT');
});

test('updates selected language on i18n language changes', async () => {
  const { i18nMock } = setup();

  expect(await findBySelectSelection(document.body, { name: 'GB' })).toBeInTheDocument();

  act(() => {
    i18nMock.changeLanguage('pt-PT');
  });

  expect(await findBySelectSelection(document.body, { name: 'PT' })).toBeInTheDocument();
});
