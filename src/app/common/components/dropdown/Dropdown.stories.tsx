import { Story, Meta } from '@storybook/react';
import { Button } from '../button/Button';
import { Dropdown, DropdownProps } from './Dropdown';

export default {
  title: 'Atoms/Dropdown',
  component: Dropdown,
  subcomponents: {
    DropdownMenu: Dropdown.Menu,
    DropdownMenuItem: Dropdown.MenuItem,
  },
  argTypes: {},
  args: {
    children: <Button>trigger button</Button>,
    menu: (
      <Dropdown.Menu>
        <Dropdown.MenuItem>Option 1</Dropdown.MenuItem>
        <Dropdown.MenuItem>Option 2</Dropdown.MenuItem>
        <Dropdown.MenuItem>Option 3</Dropdown.MenuItem>
      </Dropdown.Menu>
    ),
  },
} as Meta<DropdownProps>;

const Template: Story<DropdownProps> = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {};
