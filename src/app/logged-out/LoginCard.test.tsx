import { renderWithProviders } from 'test/component.helper';
import LoginCardStory, { Submitting, Default } from './LoginCard.stories';

test.each([
  ['Default', Default],
  ['Submitting', Submitting],
])('renders %s story', (_, Component) => {
  renderWithProviders(<Component {...LoginCardStory.args} {...Component.args} />);
});
