import { Story, Meta } from '@storybook/react';
import { ConfigProvider } from 'app/core/configs/ConfigProvider';
import { I18nProvider } from 'app/core/i18n/I18nProvider';
import { ColorVariant } from 'app/core/models/styles.model';
import { Suspense } from 'react';
import { StorybookVariants } from 'test/storybook.helper';
import { Spinner, SpinnerProps } from './Spinner';

export default {
  title: 'Atoms/Spinner',
  component: Spinner,
  argTypes: { variant: { control: { disable: true } } },
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  decorators: [
    (Story) => (
      <ConfigProvider>
        <I18nProvider>
          <Story />
        </I18nProvider>
      </ConfigProvider>
    ),
  ],
} as Meta<SpinnerProps>;

const colorVariants = [undefined, ...Object.values(ColorVariant)];
const Template: Story<SpinnerProps> = (args) => (
  <Suspense fallback={<div>loading...</div>}>
    <StorybookVariants>
      {colorVariants.map((variant) => (
        <Spinner
          {...args}
          key={variant ?? 'undefined'}
          variant={variant}
          style={{ width: '100px', height: '100px', backgroundColor: variant ?? '#000' }}
        />
      ))}
    </StorybookVariants>
  </Suspense>
);

export const Default = Template.bind({});
Default.args = {};

export const AcessibilityAlert = Template.bind({});
AcessibilityAlert.args = {
  isAlert: true,
};
