import { Story, Meta } from '@storybook/react';
import { ColorVariant, ControlSize } from 'app/core/models/styles.model';
import { StorybookVariants } from 'test/storybook.helper';
import { Input, InputProps } from './Input';

export default {
  title: 'Atoms/Input',
  component: Input,
  argTypes: {
    color: { control: { disable: true } },
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
  <StorybookVariants>
    {colorVariants.map((color) => (
      <Input {...args} key={color ?? 'undefined'} color={color} />
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
