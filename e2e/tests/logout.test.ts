import { test, expect } from '@playwright/test';
import { createStorageFixture } from '../fixtures/storage-fixture';
import { getDocument, queries } from 'playwright-testing-library';

const { findByRole } = queries;

test.use({ storageState: createStorageFixture() });

test('logs outs', async ({ page }) => {
  await page.goto('/');
  const document = await getDocument(page);

  await (await findByRole(document, 'button', { name: /Log out/i })).click();

  expect(await findByRole(document, 'button', { name: /Log in/i })).toBeDefined();
});
