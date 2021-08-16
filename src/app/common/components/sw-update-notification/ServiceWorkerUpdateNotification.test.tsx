import { composeStories } from '@storybook/testing-react';
import {
  ServiceWorkerUpdateContext,
  UpdateServiceWorkerMessage,
} from 'app/core/providers/ServiceWorkerUpdateProvider';
import { renderWithProviders } from 'test/component.helper';
import { renderHookWithProviders } from 'test/hook.helper';
import { useServiceWorkerUpdateNotification } from './ServiceWorkerUpdateNotification';
import * as stories from './ServiceWorkerUpdateNotification.stories';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { firstValueFrom, fromEvent } from 'rxjs';

const { Default } = composeStories(stories);

test.each([['Default', Default]])('renders %s story', (_, Component) => {
  renderWithProviders(<Component />);
});

function setup({ hasUpdate }: { hasUpdate: boolean }) {
  renderHookWithProviders(() => useServiceWorkerUpdateNotification(), {
    wrapper: ({ children }) => (
      <ServiceWorkerUpdateContext.Provider value={hasUpdate}>
        {children}
      </ServiceWorkerUpdateContext.Provider>
    ),
  });
}

test('shows notification if service worker has an update', () => {
  setup({ hasUpdate: true });

  const notification = screen.getByRole('alert');
  expect(notification).toBeInTheDocument();
  expect(notification).toHaveTextContent(/components.serviceWorkerUpdateNotification.message/i);
});

test('does not show notification if service worker does not have an update', () => {
  setup({ hasUpdate: false });

  expect(screen.queryByRole('alert')).toBeNull();
});

test('sends message on update click', async () => {
  const message$ = fromEvent<MessageEvent>(window, 'message');

  setup({ hasUpdate: true });

  userEvent.click(screen.getByRole('button', { name: /actions.update/i }));

  const expectedMessage: UpdateServiceWorkerMessage = { type: 'UPDATE_SERVICE_WORKER' };
  const message = await firstValueFrom(message$);

  expect(message.data).toEqual(expectedMessage);
});
