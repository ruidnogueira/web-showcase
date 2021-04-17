import { Story, Meta } from '@storybook/react';
import { Suspense } from 'react';
import { StorybookGlobalProviders } from 'test/storybook.helper';
import { LoginCardError, LoginCardPresentation, LoginCardPresentationProps } from './LoginCard';

export default {
  title: 'Organisms/Login Card',
  component: LoginCardPresentation,
  argTypes: {
    error: {
      control: { type: 'inline-radio' },
      options: [undefined, ...Object.values(LoginCardError)],
    },
  },
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
    <LoginCardPresentation {...args} />
  </Suspense>
);

export const Default = Template.bind({});
Default.args = {};
