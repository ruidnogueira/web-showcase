import { renderHook } from '@testing-library/react-hooks';
import { ConfigProvider } from '../configs/ConfigProvider';
import { AuthMachineProvider, useAuthMachine } from './AuthMachineProvider';

test('renders when provider exists', () => {
  const { result } = renderHook(() => useAuthMachine(), {
    wrapper: ({ children }) => (
      <ConfigProvider>
        <AuthMachineProvider>{children}</AuthMachineProvider>
      </ConfigProvider>
    ),
  });

  expect(result.error).toBeUndefined();
});

test('throws error if provider is missing', () => {
  const { result } = renderHook(() => useAuthMachine(), {
    wrapper: ({ children }) => <ConfigProvider>{children}</ConfigProvider>,
  });

  expect(result.error).toBeDefined();
});
