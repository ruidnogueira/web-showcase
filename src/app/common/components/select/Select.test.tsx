import { renderWithProviders } from 'test/component.helper';
import Story, { Default, Disabled, Small } from './Select.stories';

test.each([
  ['Default', Default],
  ['Disabled', Disabled],
  ['Small', Small],
])('renders %s story', (_, Component) => {
  renderWithProviders(<Component {...Story.args} {...Component.args} />);
});
