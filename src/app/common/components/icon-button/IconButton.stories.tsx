import { Story, Meta } from '@storybook/react';
import { ColorVariant, ControlSize } from 'app/core/models/styles.model';
import { StorybookVariants } from 'test/storybook.helper';
import { IconButton, IconButtonProps, IconButtonVariant } from './IconButton';
import { X as CloseIcon } from 'react-feather';

export default {
  title: 'Atoms/IconButton',
  component: IconButton,
  argTypes: {
    variant: { control: { disable: true } },
    size: {
      control: { type: 'select' },
      options: [undefined, ...Object.values(ControlSize)],
    },
  },
  args: {
    children: <CloseIcon />,
    type: 'button',
    disabled: false,
  },
} as Meta<IconButtonProps>;

const colorVariants = [undefined, ...Object.values(ColorVariant)];
const Template: Story<IconButtonProps> = (args) => (
  <StorybookVariants>
    <IconButton {...args} variant={IconButtonVariant.Transparent} />

    {colorVariants.map((color) => (
      <IconButton
        {...args}
        key={color ?? 'undefined'}
        color={color}
        variant={IconButtonVariant.Filled}
      />
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
