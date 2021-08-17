import { PlaywrightTestConfig } from '@playwright/test';

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const config: PlaywrightTestConfig = {
  outputDir: 'results',
  forbidOnly: !!process.env.CI,
  reporter: [[process.env.CI ? 'dot' : 'list']],
  use: {
    baseURL: `http://127.0.0.1:${port}/web-showcase`,
    headless: true,
    locale: 'en-GB',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'Chromium', use: { browserName: 'chromium' } },
    { name: 'Firefox', use: { browserName: 'firefox' } },
    { name: 'WebKit', use: { browserName: 'webkit' } },
  ],
  webServer: {
    command: process.env.CI ? 'npm run build:serve' : 'npm run start:silent',
    port,
    reuseExistingServer: !process.env.CI,
  },
};

export default config;
