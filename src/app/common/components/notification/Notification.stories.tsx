import { Story, Meta } from '@storybook/react';
import { StorybookVariants } from 'test/storybook.helper';
import { Button } from '../button/Button';
import { Notification, NotificationPosition, NotificationProps } from './Notification';
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

  return (
    <StorybookVariants>
      {positions.map((position) => (
        <Button
          type="button"
          key={position}
          onClick={() =>
            notification.open({
              position,
              message: 'Example notification',
              duration: 5000,
              isClosable: true,
            })
          }
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
