import { render } from '@testing-library/react';
import { ButtonProps } from './Button';
import ButtonStory, { Default, Disabled, Small } from './Button.stories';

test.each([
  ['Default', Default],
  ['Disabled', Disabled],
  ['Small', Small],
])('renders %s story', (_, Component) => {
  const props = { ...ButtonStory.args, ...Component.args } as ButtonProps;
  render(<Component {...props} />);
});
