import { ThemeContext, Theme } from 'app/core/providers/ThemeProvider';
import { renderWithProviders } from 'test/component.helper';
import { ThemeSwitch } from './ThemeSwitch';
import Story, { Default } from './ThemeSwitch.stories';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const setup = ({ theme }: { theme: Theme }) => {
  const toggleThemeMock = jest.fn();

  const result = renderWithProviders(
    <ThemeContext.Provider value={{ theme, toggleTheme: toggleThemeMock }}>
      <ThemeSwitch />
    </ThemeContext.Provider>
  );

  return { ...result, toggleThemeMock };
};

test.each([['Default', Default]])('renders %s story', (_, Component) => {
  renderWithProviders(<Component {...Story.args} {...Component.args} />);
});

test('renders', () => {
  const { container } = setup({ theme: 'light' });
  expect(container).toBeInTheDocument();
});

test('is checked if light theme is on', async () => {
  setup({ theme: 'light' });
  expect(getSwitch('light')).toBeChecked();
});

test('is unchecked if dark light theme is on', () => {
  setup({ theme: 'dark' });
  expect(getSwitch('dark')).not.toBeChecked();
});

test('toggles theme', () => {
  const { toggleThemeMock } = setup({ theme: 'light' });

  userEvent.click(getSwitch('light'));

  expect(toggleThemeMock).toHaveBeenCalledTimes(1);
});

function getSwitch(theme: Theme) {
  return screen.getByLabelText('components.themeSwitch.' + theme);
}
