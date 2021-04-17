import { render } from '@testing-library/react';
import SelectStory, { Default, Disabled, Small } from './Select.stories';

test.each([
  ['Default', Default],
  ['Disabled', Disabled],
  ['Small', Small],
])('renders %s story', (_, Component) => {
  render(<Component {...SelectStory.args} {...Component.args} />);
});
