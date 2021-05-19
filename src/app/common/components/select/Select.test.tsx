import { renderWithProviders } from 'test/component.helper';
import * as stories from './Select.stories';
import { composeStories } from '@storybook/testing-react';

const { Default, Disabled, Small } = composeStories(stories);

test.each([
  ['Default', Default],
  ['Disabled', Disabled],
  ['Small', Small],
])('renders %s story', (_, Component) => {
  renderWithProviders(<Component />);
});
