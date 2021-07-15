import { Story, Meta } from '@storybook/react';
import { StorybookGlobalProviders } from 'test/storybook.helper';
import { LoggedInHeader } from './LoggedInHeader';

export default {
  title: 'Organisms/LoggedInHeader',
  component: LoggedInHeader,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <StorybookGlobalProviders>
        <Story />
      </StorybookGlobalProviders>
    ),
  ],
} as Meta;

const Template: Story = () => <LoggedInHeader />;

export const Default = Template.bind({});
Default.args = {};
