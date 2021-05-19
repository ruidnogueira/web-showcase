import { renderWithProviders } from 'test/component.helper';
import * as stories from './LoggedOutPage.stories';
import { composeStories } from '@storybook/testing-react';

const { Default } = composeStories(stories);

test.each([['Default', Default]])('renders %s story', (_, Component) => {
  renderWithProviders(<Component />);
});
