import { renderHook } from '@testing-library/react-hooks';
import { useId } from './use-id';

test('uses provided id', () => {
  const { result } = renderHook(() => useId({ id: 'example-id' }));

  expect(result.current).toBe('example-id');
});

test('generates unique id', () => {
  const { result } = renderHook(() => useId());

  expect(result.current).toHaveLength(36);
});
