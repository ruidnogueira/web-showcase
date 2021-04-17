import { Story, Meta } from '@storybook/react';
import { ColorVariant, ControlSize } from 'app/core/models/styles.model';
import { StorybookVariants } from 'test/storybook.helper';
import { Button, ButtonProps } from './Button';

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    variant: { control: { disable: true } },
    size: {
      control: { type: 'select' },
      options: [undefined, ...Object.values(ControlSize)],
    },
  },
  args: {
    children: 'Button',
    type: 'button',
    disabled: false,
  },
} as Meta<ButtonProps>;

const colorVariants = [undefined, ...Object.values(ColorVariant)];
const Template: Story<ButtonProps> = (args) => (
  <StorybookVariants>
    {colorVariants.map((variant) => (
      <Button {...args} key={variant ?? 'undefined'} variant={variant} />
    ))}
  </StorybookVariants>
);

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Small = Template.bind({});
Small.args = {
  size: ControlSize.Small,
};
