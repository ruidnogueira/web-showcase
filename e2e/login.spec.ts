import { test as base, expect } from '@playwright/test';

const test = base.extend({
  // storageState: async (_, use) => {
  //   await use({
  //     origins: [
  //       {
  //         origin: 'http://localhost:3000/',
  //         localStorage
  //       },
  //     ],
  //   });
  // },
});

test('is a basic test with the page', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  expect(await page.innerText('.navbar__title')).toBe('Playwright');
});

test('visits app', async ({ page }) => {
  await page.goto('');
  expect(await page.title()).toBe('Web Showcase');
});
