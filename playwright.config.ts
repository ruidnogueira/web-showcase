import { PlaywrightTestConfig } from '@playwright/test';

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const config: PlaywrightTestConfig = {
  testDir: 'e2e',
  forbidOnly: !!process.env.TEST_CI,
  reporter: [[process.env.CI ? 'dot' : 'list']],
  use: {
    baseURL: `http://127.0.0.1:${port}/web-showcase`,
    headless: true,
  },
  projects: [
    { name: 'Chromium', use: { browserName: 'chromium' } },
    { name: 'Firefox', use: { browserName: 'firefox' } },
    { name: 'WebKit', use: { browserName: 'webkit' } },
  ],
  webServer: {
    command: 'npm run start:silent',
    port,
    reuseExistingServer: !process.env.CI,
  },
};

export default config;
