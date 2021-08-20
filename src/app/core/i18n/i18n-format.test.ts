import { I18nConfig, i18nConfig } from '../configs/i18n.config';
import { getI18nFormatter } from './i18n-format';
import enGB from 'date-fns/locale/en-GB';
import enUS from 'date-fns/locale/en-US';
import ptPT from 'date-fns/locale/pt';
import { format as formatDate } from 'date-fns';

jest.mock('date-fns/format');
const formatDateMock = formatDate as unknown as jest.Mock<typeof format>;

const config: I18nConfig = {
  ...i18nConfig,
  fallbackLanguage: 'pt-PT',
  fallbackDateLocale: ptPT,
  dateLocales: {
    pt: ptPT,
    en: enGB,
    'en-US': enUS,
  },
};

const format = getI18nFormatter(config);

test('does not format if language is missing', () => {
  const value = new Date();
  const result = format(value, 'y');

  expect(result).toBe(value);
});

test('does not format if value is not supported', () => {
  const value = 'Test value';
  const result = format(value, 'y', 'en-GB');

  expect(result).toBe(value);
});

test('formats numbers', () => {
  const value = 10_000.02;
  const result = format(value, undefined, 'en-GB');

  expect(result).toBe('10,000.02');
});

describe('date', () => {
  test('does not format dates if format is missing', () => {
    const value = new Date();
    const result = format(value, undefined, 'en-GB');

    expect(result).toBe(value);
  });

  test('formats dates for current language', () => {
    const value = new Date();
    const formatStr = 'yyyy-MM-dd';
    format(value, formatStr, 'en-US');

    expect(formatDateMock).toHaveBeenCalledWith(value, formatStr, { locale: enUS });
  });

  test('formats dates for language of same culture if current language is not supported', () => {
    const value = new Date();
    const formatStr = 'yyyy-MM-dd';
    format(value, formatStr, 'en-CA');

    expect(formatDateMock).toHaveBeenCalledWith(value, formatStr, { locale: enGB });
  });

  test('formats dates for fallback language if current language and languages from same culture  not supported', () => {
    const value = new Date();
    const formatStr = 'yyyy-MM-dd';
    format(value, formatStr, 'none');

    expect(formatDateMock).toHaveBeenCalledWith(value, formatStr, { locale: ptPT });
  });
});
