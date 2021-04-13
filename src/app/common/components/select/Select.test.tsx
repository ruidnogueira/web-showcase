import { render } from '@testing-library/react';
import { Default, Error, Primary, Small } from './Select.stories';

test.each([
  ['Default', Default],
  ['Error', Error],
  ['Primary', Primary],
  ['Small', Small],
])('renders %s story', (_, Component) => {
  render(<Component {...Component.args} />);
});
