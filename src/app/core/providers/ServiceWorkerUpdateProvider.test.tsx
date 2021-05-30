import { waitFor } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import {
  HasServiceWorkerUpdateMessage,
  ServiceWorkerUpdateProvider,
  useServiceWorkerUpdate,
} from './ServiceWorkerUpdateProvider';

test('renders when provider exists', () => {
  const { result } = renderHook(() => useServiceWorkerUpdate(), {
    wrapper: ServiceWorkerUpdateProvider,
  });

  expect(result.error).toBeUndefined();
});

test('throws error if provider is missing', () => {
  const { result } = renderHook(() => useServiceWorkerUpdate());

  expect(result.error).toBeDefined();
});

test('is false while waiting for update message', () => {
  const { result } = renderHook(() => useServiceWorkerUpdate(), {
    wrapper: ServiceWorkerUpdateProvider,
  });

  expect(result.current).toBe(false);
});

test('is true after update message is received', async () => {
  const { result } = renderHook(() => useServiceWorkerUpdate(), {
    wrapper: ServiceWorkerUpdateProvider,
  });

  act(() => {
    const message: HasServiceWorkerUpdateMessage = { type: 'HAS_SERVICE_WORKER_UPDATE' };
    window.postMessage(message, '*');
  });

  await waitFor(() => {
    expect(result.current).toBe(true);
  });
});
