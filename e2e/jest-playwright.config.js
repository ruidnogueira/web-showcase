// https://github.com/playwright-community/jest-playwright/#configuration
module.exports = {
  browsers: [process.env.BROWSER],
  launchOptions: {
    headless: true,
  },
  contextOptions: {
    recordVideo: process.env.TEST_CI ? { dir: 'videos/' } : undefined,
  },
  debugOptions: {
    browsers: ['chromium'],
    launchOptions: {
      headless: false,
      devtools: false,
      slowMo: 50,
    },
  },
};
