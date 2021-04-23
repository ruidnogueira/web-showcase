import { renderWithProviders } from 'test/component.helper';
import Story, { Submitting, Default } from './LoginCard.stories';

test.each([
  ['Default', Default],
  ['Submitting', Submitting],
])('renders %s story', (_, Component) => {
  renderWithProviders(<Component {...Story.args} {...Component.args} />);
});
