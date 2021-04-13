import { render } from '@testing-library/react';
import { ButtonProps } from './Button';
import ButtonStory, { Default, Error, Primary, Small } from './Button.stories';

test.each([
  ['Default', Default],
  ['Error', Error],
  ['Primary', Primary],
  ['Small', Small],
])('renders %s story', (_, Component) => {
  const props = { ...ButtonStory.args, ...Component.args } as ButtonProps;
  render(<Component {...props} />);
});
