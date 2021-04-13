import { Story, Meta } from '@storybook/react';
import { ColorVariant, ControlSize } from 'app/core/models/styles.model';
import { Button, ButtonProps } from './Button';

export default {
  title: 'UI Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [undefined, ...Object.values(ColorVariant)],
    },
    size: {
      control: { type: 'select' },
      options: [undefined, ...Object.values(ControlSize)],
    },
  },
  args: {
    children: 'Button',
    type: 'button',
  },
} as Meta<ButtonProps>;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Primary = Template.bind({});
Primary.args = {
  variant: ColorVariant.Primary,
};

export const Error = Template.bind({});
Error.args = {
  variant: ColorVariant.Error,
};

export const Small = Template.bind({});
Small.args = {
  size: ControlSize.Small,
};
