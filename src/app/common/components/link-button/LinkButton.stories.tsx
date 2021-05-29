import { Story, Meta } from '@storybook/react';
import { ControlSize } from 'app/core/models/styles.model';
import { LinkButton, LinkButtonProps } from './LinkButton';

export default {
  title: 'Atoms/LinkButton',
  component: LinkButton,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: [undefined, ...Object.values(ControlSize)],
    },
  },
  args: {
    children: 'Link Button',
    disabled: false,
  },
} as Meta<LinkButtonProps>;

const Template: Story<LinkButtonProps> = (args) => <LinkButton {...args} />;

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
