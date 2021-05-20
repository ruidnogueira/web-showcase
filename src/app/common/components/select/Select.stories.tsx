import { Story, Meta } from '@storybook/react';
import { ColorVariant, ControlSize } from 'app/core/models/styles.model';
import { StorybookVariants } from 'test/storybook.helper';
import { Select, SelectProps } from './Select';

export default {
  title: 'Atoms/Select',
  component: Select,
  argTypes: {
    color: { control: { disable: true } },
    size: {
      control: { type: 'select' },
      options: [undefined, ...Object.values(ControlSize)],
    },
  },
  args: {
    placeholder: 'Select',
    disabled: false,
  },
} as Meta<SelectProps<any>>;

const colorVariants = [undefined, ...Object.values(ColorVariant)];
const Template: Story<SelectProps<any>> = (args) => (
  <StorybookVariants>
    {colorVariants.map((color) => (
      <Select {...args} key={color ?? 'undefined'} color={color}>
        <Select.Option value="john">John</Select.Option>
        <Select.Option value="ann">Ann</Select.Option>
        <Select.Option value="davis">Davis</Select.Option>
      </Select>
    ))}
  </StorybookVariants>
);

export const Default = Template.bind({});
Default.args = {};

export const Open = Template.bind({});
Open.args = {
  open: true,
  value: 'ann',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Small = Template.bind({});
Small.args = {
  size: ControlSize.Small,
};
