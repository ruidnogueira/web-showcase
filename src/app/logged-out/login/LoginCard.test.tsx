import { renderWithProviders } from 'test/component.helper';
import { LoginCardPresentationProps } from './LoginCard';
import Story, { Submitting, Default } from './LoginCard.stories';

test.each([
  ['Default', Default],
  ['Submitting', Submitting],
])('renders %s story', (_, Component) => {
  const props = { ...Story.args, ...Component.args } as LoginCardPresentationProps;
  renderWithProviders(<Component {...props} />);
});
