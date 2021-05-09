import { Story, Meta, Args } from '@storybook/react';
import { ColorVariant, ControlSize } from 'app/core/models/styles.model';
import { Theme } from 'app/core/providers/ThemeProvider';
import { StorybookVariants } from 'test/storybook.helper';
import { Select, SelectProps } from './Select';

export default {
  title: 'Atoms/Select',
  component: Select,
  argTypes: {
    variant: { control: { disable: true } },
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
const Template: Story<SelectProps<any>> = (args, { globals }: { globals?: Args }) => {
  const theme: Theme = globals?.theme;

  return (
    <StorybookVariants>
      {colorVariants.map((variant) => (
        <Select
          {...args}
          key={variant ?? 'undefined'}
          variant={variant}
          dropdownClassName={'theme--' + theme}
        >
          <Select.Option value="john">John</Select.Option>
          <Select.Option value="ann">Ann</Select.Option>
          <Select.Option value="davis">Davis</Select.Option>
        </Select>
      ))}
    </StorybookVariants>
  );
};

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
