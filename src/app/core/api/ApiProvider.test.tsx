import { renderHook } from '@testing-library/react-hooks';
import { ApiProvider, useApiClient } from './ApiProvider';

test('renders when provider exists', () => {
  const { result } = renderHook(() => useApiClient(), {
    wrapper: ApiProvider,
  });

  expect(result.error).toBeUndefined();
});

test('throws error if provider is missing', () => {
  const { result } = renderHook(() => useApiClient());

  expect(result.error).toBeDefined();
});
