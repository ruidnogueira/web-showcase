import { render } from '@testing-library/react';
import { Field } from './Field';

test('renders', () => {
  const { container } = render(<Field>field text</Field>);
  expect(container).toBeInTheDocument();
});
