import { Story, Meta } from '@storybook/react';
import { ColorVariant, ControlSize } from 'app/core/models/styles.model';
import { Select, SelectProps } from './Select';

export default {
  title: 'UI components/Select',
  component: Select,
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
    placeholder: 'Select',
  },
} as Meta<SelectProps<any>>;

const Template: Story<SelectProps<any>> = (args) => (
  <Select {...args}>
    <Select.Option value="john">John</Select.Option>
    <Select.Option value="ann">Ann</Select.Option>
    <Select.Option value="davis">Davis</Select.Option>
  </Select>
);

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
