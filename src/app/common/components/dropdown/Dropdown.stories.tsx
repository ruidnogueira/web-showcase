import { Story, Meta } from '@storybook/react';
import { Dropdown, DropdownProps } from './Dropdown';

export default {
  title: 'Atoms/Dropdown',
  component: Dropdown,
  argTypes: {},
  args: {
    children: 'example',
  },
} as Meta<DropdownProps>;

const Template: Story<DropdownProps> = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {};
