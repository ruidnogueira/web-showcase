import { test, expect } from '@playwright/test';
import { mockAuthToken, mockUserEmail, mockUserPassword } from '../../src/mocks/model/user.mock';
import { delay } from '../utils/promise';
import { getDocument, queries } from 'playwright-testing-library';

const { findByRole, findByLabelText } = queries;

test('logs in', async ({ page }) => {
  await page.route('**/auth-token', async (route) => {
    await delay(1000);
    return route.fulfill({
      status: 200,
      body: mockAuthToken(),
    });
  });

  await page.goto('/');
  const document = await getDocument(page);

  await (await findByLabelText(document, /Email/i)).type(mockUserEmail());
  await (await findByLabelText(document, /Password/i)).type(mockUserPassword());
  await (await findByRole(document, 'button', { name: /Log in/i })).click();

  expect(await findByRole(document, 'button', { name: /loading/i })).toBeDefined();
  expect(await findByRole(document, 'button', { name: /Log out/i })).toBeDefined();
});
