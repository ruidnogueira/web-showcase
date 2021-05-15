import { render } from '@testing-library/react';
import { Label } from './Label';

test('renders', () => {
  const { container } = render(<Label>label text</Label>);
  expect(container).toBeInTheDocument();
});
