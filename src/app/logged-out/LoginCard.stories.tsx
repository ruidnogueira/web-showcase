import { Story, Meta } from '@storybook/react';
import { Suspense } from 'react';
import { StorybookGlobalProviders } from 'test/storybook.helper';
import { LoginCardPresentation, LoginCardPresentationProps } from './LoginCard';

export default {
  title: 'Organisms/Login Card',
  component: LoginCardPresentation,
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
} as Meta<LoginCardPresentationProps>;

const Template: Story<LoginCardPresentationProps> = (args) => (
  <Suspense fallback={<div>loading...</div>}>
    <LoginCardPresentation />
  </Suspense>
);

export const Default = Template.bind({});
Default.args = {};
