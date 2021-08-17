import { test, expect } from '@playwright/test';
import { createStorageFixture } from '../fixtures/storage-fixture';

test.use({ storageState: createStorageFixture() });

test('visits app', async ({ page }) => {
  await page.goto('/');
  expect(await page.title()).toBe('Web Showcase');
});
