import { Story, Meta } from '@storybook/react';
import { ConfigProvider } from 'app/core/configs/ConfigProvider';
import { I18nProvider } from 'app/core/i18n/I18nProvider';
import { ColorVariant } from 'app/core/models/styles.model';
import { useTheme } from 'app/core/providers/ThemeProvider';
import { StorybookVariants } from 'test/storybook.helper';
import { Spinner, SpinnerColorVariant, SpinnerProps } from './Spinner';

export default {
  title: 'Atoms/Spinner',
  component: Spinner,
  argTypes: { color: { control: { disable: true } } },
  parameters: {},
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

const colorVariants = [
  undefined,
  ...Object.values(ColorVariant),
  ...Object.values(SpinnerColorVariant),
];

const Template: Story<SpinnerProps> = (args) => {
  const { theme } = useTheme();
  const invertedBackground = theme === 'light' ? '#000' : '#fff';

  return (
    <StorybookVariants>
      {colorVariants.map((color) => (
        <Spinner
          {...args}
          key={color ?? 'undefined'}
          color={color}
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: color !== SpinnerColorVariant.Inverted ? color : invertedBackground,
          }}
        />
      ))}
    </StorybookVariants>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const AcessibilityAlert = Template.bind({});
AcessibilityAlert.args = {
  isAlert: true,
};
