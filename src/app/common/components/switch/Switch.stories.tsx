import { Story, Meta } from '@storybook/react';
import { ColorVariant, ControlSize } from 'app/core/models/styles.model';
import { StorybookVariants } from 'test/storybook.helper';
import { Switch, SwitchProps } from './Switch';

export default {
  title: 'Atoms/Switch',
  component: Switch,
  argTypes: {
    variant: { control: { disable: true } },
    size: {
      control: { type: 'select' },
      options: [undefined, ...Object.values(ControlSize)],
    },
  },
  args: {},
} as Meta<SwitchProps>;

const colorVariants = [undefined, ...Object.values(ColorVariant)];
const Template: Story<SwitchProps> = (args) => (
  <StorybookVariants>
    {colorVariants.map((variant) => (
      <Switch {...args} key={variant ?? 'undefined'} variant={variant} />
    ))}
  </StorybookVariants>
);

export const Default = Template.bind({});
Default.args = {};

export const Small = Template.bind({});
Small.args = {
  size: ControlSize.Small,
};
