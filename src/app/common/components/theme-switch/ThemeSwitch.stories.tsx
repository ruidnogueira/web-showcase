import { Story, Meta } from '@storybook/react';
import { StorybookGlobalProviders } from 'test/storybook.helper';
import { ThemeSwitch } from './ThemeSwitch';

export default {
  title: 'Atoms/ThemeSwitch',
  component: ThemeSwitch,
  parameters: {},
  decorators: [
    (Story) => (
      <StorybookGlobalProviders>
        <Story />
      </StorybookGlobalProviders>
    ),
  ],
} as Meta;

const Template: Story = () => <ThemeSwitch />;

export const Default = Template.bind({});
Default.args = {};
