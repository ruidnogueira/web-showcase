import { Story, Meta } from '@storybook/react';
import { Suspense } from 'react';
import { StorybookGlobalProviders } from 'test/storybook.helper';
import { LoginCardPresentation, LoginCardPresentationProps } from './LoginCard';
import { LoginMachineError } from './loginMachine';

export default {
  title: 'Organisms/Login Card',
  component: LoginCardPresentation,
  argTypes: {
    error: {
      control: { type: 'inline-radio' },
      options: [undefined, ...Object.values(LoginMachineError)],
    },
  },
  args: {
    values: { email: '', password: '' },
    onChange: () => {},
    onSubmit: () => {},
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
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
} as Meta<LoginCardPresentationProps>;

const Template: Story<LoginCardPresentationProps> = (args) => (
  <Suspense fallback={<div>loading...</div>}>
    <LoginCardPresentation {...args} />
  </Suspense>
);

export const Default = Template.bind({});
Default.args = {};

export const Submitting = Template.bind({});
Submitting.args = {
  isSubmitting: true,
};
