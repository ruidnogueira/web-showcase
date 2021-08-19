import { render, screen, within } from '@testing-library/react';
import { Portal } from './Portal';

test('renders content inside portal', () => {
  const text = 'test content';

  render(
    <div data-testid="wrapper">
      <Portal>{text}</Portal>
    </div>
  );

  const wrapper = screen.getByTestId('wrapper');

  expect(within(wrapper).queryByText(text)).toBeNull();
  expect(screen.getByText(text)).toBeInTheDocument();
});

test('renders multiple portals', () => {
  const text = 'test content';

  render(
    <>
      <Portal>{text}</Portal>
      <Portal>{text}</Portal>
      <Portal>{text}</Portal>
    </>
  );

  expect(screen.getAllByText(text)).toHaveLength(3);
});
