import { Story, Meta } from '@storybook/react';
import { ColorVariant, ControlSize } from 'app/core/models/styles.model';
import { Input, InputProps } from './Input';

export default {
  title: 'UI Components/Input',
  component: Input,
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
    placeholder: 'Input',
  },
} as Meta<InputProps>;

const Template: Story<InputProps> = (args) => <Input {...args} />;

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
