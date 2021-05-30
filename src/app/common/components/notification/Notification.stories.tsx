import { Story, Meta } from '@storybook/react';
import { useRef } from 'react';
import { StorybookVariants } from 'test/storybook.helper';
import { Button } from '../button/Button';
import { Notification, NotificationProps } from './Notification';
import { NotificationPosition } from './notification.types';
import { NotificationProvider, useNotification } from './NotificationProvider';

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

export const Closable = Template.bind({});
Closable.args = {
  isClosable: true,
};

const positions = Object.values(NotificationPosition);

export const Examples: Story<NotificationProps> = () => {
  const notification = useNotification();
  const count = useRef(0);

  return (
    <StorybookVariants>
      {positions.map((position) => (
        <Button
          key={position}
          onClick={() => {
            count.current++;

            notification.open({
              position,
              message: 'Example notification ' + count.current,
              duration: 5000,
              isClosable: true,
            });
          }}
        >
          {position}
        </Button>
      ))}
    </StorybookVariants>
  );
};

Examples.parameters = {
  layout: 'centered',
};
Examples.decorators = [
  (Story) => (
    <NotificationProvider>
      <Story />
    </NotificationProvider>
  ),
];
