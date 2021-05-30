import { Story, Meta } from '@storybook/react';
import { Notification } from '../notification/Notification';
import { ServiceWorkerUpdateMessage } from './ServiceWorkerUpdateNotification';

export default {
  title: 'Atoms/SwUpdateNotification',
  component: ServiceWorkerUpdateMessage,
  argTypes: {},
  args: {},
  parameters: {},
} as Meta;

const Template: Story = () => (
  <Notification isClosable={true}>
    <ServiceWorkerUpdateMessage />
  </Notification>
);

export const Default = Template.bind({});
Default.args = {};
