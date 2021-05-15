import { Story, Meta } from '@storybook/react';
import { StorybookGlobalProviders } from 'test/storybook.helper';
import { LanguageSelect } from './LanguageSelect';

export default {
  title: 'Atoms/LanguageSelect',
  component: LanguageSelect,
  parameters: {},
  decorators: [
    (Story) => (
      <StorybookGlobalProviders>
        <Story />
      </StorybookGlobalProviders>
    ),
  ],
} as Meta;

const Template: Story = () => <LanguageSelect />;

export const Default = Template.bind({});
Default.args = {};
