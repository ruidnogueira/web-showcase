import { Story, Meta } from '@storybook/react';
import { StorybookGlobalProviders } from 'test/storybook.helper';
import { LoggedOutPage } from './LoggedOutPage';

export default {
  title: 'Pages/LoggedOutPage',
  component: LoggedOutPage,
  argTypes: {},
  args: {},
  parameters: {
    layout: 'fullscreen',
    chromatic: { viewports: [360, 1800] },
  },
  decorators: [
    (Story) => (
      <StorybookGlobalProviders>
        <Story />
      </StorybookGlobalProviders>
    ),
  ],
} as Meta<{}>;

const Template: Story<{}> = () => <LoggedOutPage />;

export const Default = Template.bind({});
Default.args = {};
