import { Story, Meta } from '@storybook/react';
import { Suspense } from 'react';
import { StorybookGlobalProviders } from 'test/storybook.helper';
import { ThemeSwitch } from './ThemeSwitch';

export default {
  title: 'Atoms/ThemeSwitch',
  component: ThemeSwitch,
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
} as Meta;

const Template: Story = () => (
  <Suspense fallback={<div>loading...</div>}>
    <ThemeSwitch />
  </Suspense>
);

export const Default = Template.bind({});
Default.args = {};
