import { render } from '@testing-library/react';
import { InputProps } from './Input';
import InputStory, { Default, Error, Primary, Small } from './Input.stories';

test.each([
  ['Default', Default],
  ['Error', Error],
  ['Primary', Primary],
  ['Small', Small],
])('renders %s story', (_, Component) => {
  const props = { ...InputStory.args, ...Component.args } as InputProps;
  render(<Component {...props} />);
});
