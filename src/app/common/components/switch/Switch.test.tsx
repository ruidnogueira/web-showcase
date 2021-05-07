import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './Switch';
import Story, { Default, Checked, Disabled, WithThumbContent, Small } from './Switch.stories';

test.each([
  ['Default', Default],
  ['Checked', Checked],
  ['Disabled', Disabled],
  ['WithThumbContent', WithThumbContent],
  ['Small', Small],
])('renders %s story', (_, Component) => {
  render(<Component {...Story.args} {...Component.args} />);
});

test('renders', () => {
  const { container } = render(<Switch />);
  expect(container).toBeInTheDocument();
});

test.each(['defaultChecked', 'checked'] as const)('is checked if %s is true', (prop) => {
  render(<Switch {...{ [prop]: true }} />);
  expect(getSwitch()).toBeChecked();
});

test.each(['defaultChecked', 'checked'] as const)('is not checked if %s is false', (prop) => {
  render(<Switch {...{ [prop]: false }} />);
  expect(getSwitch()).not.toBeChecked();
});

test('toggles the switch', () => {
  render(<Switch defaultChecked={false} />);
  const switchControl = getSwitch();

  userEvent.click(switchControl);

  expect(switchControl).toBeChecked();
});

test('does not toggle the switch if checked prop is provided', () => {
  render(<Switch checked={true} />);
  const switchControl = getSwitch();

  userEvent.click(switchControl);

  expect(switchControl).toBeChecked();
});

function getSwitch() {
  return screen.getByRole('checkbox');
}
