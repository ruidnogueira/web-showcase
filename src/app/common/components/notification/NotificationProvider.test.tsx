import { act, renderHook } from '@testing-library/react-hooks';
import { screen } from '@testing-library/react';
import { useNotification } from './NotificationProvider';
import { renderHookWithProviders } from 'test/hook.helper';
import userEvent from '@testing-library/user-event';

test('renders when provider exists', () => {
  const { result } = renderHookWithProviders(() => useNotification());

  expect(result.error).toBeUndefined();
});

test('throws error if provider is missing', () => {
  const { result } = renderHook(() => useNotification());

  expect(result.error).toBeDefined();
});

test('opens a notification', () => {
  const { result } = renderHookWithProviders(() => useNotification());

  act(() => {
    result.current.open({ message: 'Example notification' });
  });

  const notification = screen.getByRole('alert');
  expect(notification).toBeInTheDocument();
  expect(notification).toHaveTextContent('Example notification');
});

test('closes a notification', () => {
  const onCloseMock = jest.fn();
  const { result } = renderHookWithProviders(() => useNotification());

  act(() => {
    result.current.open({
      id: 'notification1',
      message: 'Example notification 1',
      onClose: onCloseMock,
    });

    result.current.open({
      id: 'notification2',
      message: 'Example notification 2',
      onClose: onCloseMock,
    });

    result.current.open({
      id: 'notification3',
      message: 'Example notification 3',
      onClose: onCloseMock,
    });
  });

  expect(screen.getAllByRole('alert')).toHaveLength(3);

  act(() => {
    result.current.close('notification2');
  });

  const notifications = screen.getAllByRole('alert');
  expect(notifications).toHaveLength(2);
  expect(notifications[0]).toHaveTextContent('Example notification 1');
  expect(notifications[1]).toHaveTextContent('Example notification 3');
  expect(onCloseMock).toHaveBeenCalledTimes(1);
});

test('closes all notifications', () => {
  const onCloseMock = jest.fn();
  const { result } = renderHookWithProviders(() => useNotification());

  act(() => {
    result.current.open({
      message: 'Example notification 1',
      onClose: onCloseMock,
    });

    result.current.open({
      message: 'Example notification 2',
      onClose: onCloseMock,
    });

    result.current.open({
      message: 'Example notification 3',
      onClose: onCloseMock,
    });
  });

  expect(screen.getAllByRole('alert')).toHaveLength(3);

  act(() => {
    result.current.closeAll();
  });

  expect(screen.queryAllByRole('alert')).toHaveLength(0);
  expect(onCloseMock).toHaveBeenCalledTimes(3);
});

test("calls onClose when notification's close button is clicked", () => {
  const onCloseMock = jest.fn();
  const { result } = renderHookWithProviders(() => useNotification());

  act(() => {
    result.current.open({
      message: 'Example notification',
      isClosable: true,
      onClose: onCloseMock,
    });
  });

  userEvent.click(screen.getByRole('button', { name: /actions.close/i }));

  expect(onCloseMock).toHaveBeenCalledTimes(1);
});
