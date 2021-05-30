import { composeStories } from '@storybook/testing-react';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import * as stories from './Notification.stories';
import { createI18nMock } from 'mocks/i18n.mock';
import { Notification } from './Notification';
import userEvent from '@testing-library/user-event';

const { Default, Closable } = composeStories(stories);

test.each([
  ['Default', Default],
  ['Closable', Closable],
])('renders %s story', (_, Component) => {
  render(
    <I18nextProvider i18n={createI18nMock()}>
      <Component />
    </I18nextProvider>
  );
});

function setup({ isClosable = false, duration }: { isClosable?: boolean; duration?: number } = {}) {
  const onCloseMock = jest.fn();

  render(
    <I18nextProvider i18n={createI18nMock()}>
      <Notification isClosable={isClosable} duration={duration} onClose={onCloseMock}>
        Example notification
      </Notification>
    </I18nextProvider>
  );

  return { onCloseMock };
}

test('shows close button when closable', () => {
  setup({ isClosable: true });
  expect(screen.getByRole('button', { name: /actions.close/i })).toBeInTheDocument();
});

test('does not show close button when not closable', () => {
  setup();
  expect(screen.queryByRole('button', { name: /actions.close/i })).toBeNull();
});

test('calls onClose when close button is clicked', () => {
  const { onCloseMock } = setup({ isClosable: true });

  expect(onCloseMock).not.toHaveBeenCalled();

  userEvent.click(screen.getByRole('button', { name: /actions.close/i }));

  expect(onCloseMock).toHaveBeenCalledTimes(1);
});

test('calls onClose when duration expires', () => {
  jest.useFakeTimers();
  const { onCloseMock } = setup({ duration: 5000 });

  expect(onCloseMock).not.toHaveBeenCalled();

  jest.runAllTimers();

  expect(onCloseMock).toHaveBeenCalledTimes(1);
});

test('cancels close timer while hovered and restarts timer when unhovered', () => {
  jest.useFakeTimers();
  const { onCloseMock } = setup({ duration: 5000 });

  userEvent.hover(screen.getByRole('alert'));
  jest.runAllTimers();

  expect(onCloseMock).not.toHaveBeenCalled();

  userEvent.unhover(screen.getByRole('alert'));
  jest.runAllTimers();

  expect(onCloseMock).toHaveBeenCalledTimes(1);
});
