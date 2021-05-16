import { Story, Meta } from '@storybook/react';
import { Notification, NotificationProps } from './Notification';

export default {
  title: 'Atoms/Notification',
  component: Notification,
  argTypes: {},
  args: {
    children: 'Example notification',
  },
  parameters: {},
} as Meta<NotificationProps>;

const Template: Story<NotificationProps> = (args) => <Notification {...args} />;

export const Default = Template.bind({});
Default.args = {};
