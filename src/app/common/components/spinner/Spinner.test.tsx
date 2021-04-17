import { render } from '@testing-library/react';
import SpinnerStory, { AcessibilityAlert, Default } from './Spinner.stories';

test.each([
  ['Default', Default],
  ['AcessibilityAlert', AcessibilityAlert],
])('renders %s story', (_, Component) => {
  render(<Component {...SpinnerStory.args} {...Component.args} />);
});
