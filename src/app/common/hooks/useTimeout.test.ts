import { renderHook } from '@testing-library/react-hooks';
import { useTimeout } from './useTimeout';

beforeEach(() => {
  jest.useFakeTimers();
});

test('executes callback after timer expires', () => {
  const callbackMock = jest.fn();
  renderHook(() => useTimeout(callbackMock, 5000));

  jest.runAllTimers();

  expect(callbackMock).toHaveBeenCalledTimes(1);
});

test('clears timer if component unmounts', () => {
  const callbackMock = jest.fn();
  const { unmount } = renderHook(() => useTimeout(callbackMock, 5000));

  unmount();
  jest.runAllTimers();

  expect(callbackMock).not.toHaveBeenCalled();
});

test('clears timer if timeout changes', () => {
  const callbackMock = jest.fn();
  const { rerender } = renderHook(({ timeout }) => useTimeout(callbackMock, timeout), {
    initialProps: { timeout: 5000 as number | null },
  });

  rerender({ timeout: null });
  jest.runAllTimers();

  expect(callbackMock).not.toHaveBeenCalled();
});

test('does not execute callback if timeout is not a number', () => {
  const callbackMock = jest.fn();
  renderHook(() => useTimeout(callbackMock));

  jest.runAllTimers();

  expect(callbackMock).not.toHaveBeenCalled();
});

test('does not retrigger timeout if callback changes, and uses latest value when timer expires', () => {
  const initialCallbackMock = jest.fn();
  const finalCallbackMock = jest.fn();

  const { rerender } = renderHook(({ callback }) => useTimeout(callback, 5000), {
    initialProps: { callback: initialCallbackMock },
  });

  rerender({ callback: finalCallbackMock });
  jest.runAllTimers();

  expect(initialCallbackMock).not.toHaveBeenCalled();
  expect(finalCallbackMock).toHaveBeenCalledTimes(1);
});
