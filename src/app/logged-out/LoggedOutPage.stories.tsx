import { Story, Meta } from '@storybook/react';
import { Suspense } from 'react';
import { StorybookGlobalProviders } from 'test/storybook.helper';
import { LoggedOutPage } from './LoggedOutPage';

// TODO CHROMATIC CONFIG

export default {
  title: 'Pages/LoggedOutPage',
  component: LoggedOutPage,
  argTypes: {},
  args: {},
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  decorators: [
    (Story) => (
      <StorybookGlobalProviders>
        <Story />
      </StorybookGlobalProviders>
    ),
  ],
} as Meta<{}>;

const Template: Story<{}> = () => (
  <Suspense fallback={<div>loading...</div>}>
    <LoggedOutPage />
  </Suspense>
);

export const Default = Template.bind({});
Default.args = {};
