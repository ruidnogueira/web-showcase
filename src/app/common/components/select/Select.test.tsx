import { render } from '@testing-library/react';
import Story, { Default, Disabled, Small } from './Select.stories';

test.each([
  ['Default', Default],
  ['Disabled', Disabled],
  ['Small', Small],
])('renders %s story', (_, Component) => {
  render(<Component {...Story.args} {...Component.args} />);
});
