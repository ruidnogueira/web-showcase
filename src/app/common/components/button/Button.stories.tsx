import { Story, Meta } from '@storybook/react';
import { ColorVariant, ControlSize } from 'app/core/models/styles.model';
import { StorybookVariants } from 'test/storybook.helper';
import { Button, ButtonProps } from './Button';

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    color: { control: { disable: true } },
    size: {
      control: { type: 'select' },
      options: [undefined, ...Object.values(ControlSize)],
    },
  },
  args: {
    children: 'Button',
    disabled: false,
  },
} as Meta<ButtonProps>;

const colorVariants = [undefined, ...Object.values(ColorVariant)];
const Template: Story<ButtonProps> = (args) => (
  <StorybookVariants>
    {colorVariants.map((color) => (
      <Button {...args} key={color ?? 'undefined'} color={color} />
    ))}
  </StorybookVariants>
);

export const Default = Template.bind({});
Default.args = {};

export const Small = Template.bind({});
Small.args = {
  size: ControlSize.Small,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
