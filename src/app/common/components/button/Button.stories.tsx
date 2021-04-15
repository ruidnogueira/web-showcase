import { Story, Meta } from '@storybook/react';
import { ColorVariant, ControlSize } from 'app/core/models/styles.model';
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
  <div style={{ display: 'flex', gap: '10px' }}>
    {colorVariants.map((variant) => (
      <Button {...args} key={variant} variant={variant} />
    ))}
  </div>
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
