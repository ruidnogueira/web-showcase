import { renderWithProviders } from 'test/component.helper';
import Story, { Default } from './LoggedOutPage.stories';

test.each([['Default', Default]])('renders %s story', (_, Component) => {
  renderWithProviders(<Component {...Story.args} {...Component.args} />);
});
