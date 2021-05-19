import { render } from '@testing-library/react';
import * as stories from './Input.stories';
import { composeStories } from '@storybook/testing-react';

const { Default, Disabled, Small } = composeStories(stories);

test.each([
  ['Default', Default],
  ['Disabled', Disabled],
  ['Small', Small],
])('renders %s story', (_, Component) => {
  render(<Component />);
});
