import { Story, Meta } from '@storybook/react';
import { Suspense } from 'react';
import { StorybookGlobalProviders } from 'test/storybook.helper';
import { LanguageSelect } from './LanguageSelect';

export default {
  title: 'Atoms/LanguageSelect',
  component: LanguageSelect,
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
    <LanguageSelect />
  </Suspense>
);

export const Default = Template.bind({});
Default.args = {};
