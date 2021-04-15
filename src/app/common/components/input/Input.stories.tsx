import { Story, Meta } from '@storybook/react';
import { ColorVariant, ControlSize } from 'app/core/models/styles.model';
import { Input, InputProps } from './Input';

export default {
  title: 'Atoms/Input',
  component: Input,
  argTypes: {
    variant: { control: { disable: true } },
    size: {
      control: { type: 'select' },
      options: [undefined, ...Object.values(ControlSize)],
    },
  },
  args: {
    placeholder: 'Input',
    disabled: false,
  },
} as Meta<InputProps>;

const colorVariants = [undefined, ...Object.values(ColorVariant)];
const Template: Story<InputProps> = (args) => (
  <div style={{ display: 'flex', gap: '10px' }}>
    {colorVariants.map((variant) => (
      <Input {...args} key={variant} variant={variant} />
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
