import { test, expect } from '@playwright/test';

test('visits app', async ({ page }) => {
  await page.goto('/');
  expect(await page.title()).toBe('Web Showcase');
});
