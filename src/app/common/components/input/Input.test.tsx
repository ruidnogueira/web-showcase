import { render } from '@testing-library/react';
import { InputProps } from './Input';
import Story, { Default, Disabled, Small } from './Input.stories';

test.each([
  ['Default', Default],
  ['Disabled', Disabled],
  ['Small', Small],
])('renders %s story', (_, Component) => {
  const props = { ...Story.args, ...Component.args } as InputProps;
  render(<Component {...props} />);
});
