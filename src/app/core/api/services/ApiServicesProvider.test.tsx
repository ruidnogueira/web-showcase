import { renderHook } from '@testing-library/react-hooks';
import { ApiProvider } from '../ApiProvider';
import { ApiServicesProvider, useApiServices } from './ApiServicesProvider';

test('renders when provider exists', () => {
  const { result } = renderHook(() => useApiServices(), {
    wrapper: ({ children }) => (
      <ApiProvider>
        <ApiServicesProvider>{children}</ApiServicesProvider>
      </ApiProvider>
    ),
  });

  expect(result.error).toBeUndefined();
});

test('throws error if provider is missing', () => {
  const { result } = renderHook(() => useApiServices(), {
    wrapper: ({ children }) => <ApiProvider>{children}</ApiProvider>,
  });

  expect(result.error).toBeDefined();
});
