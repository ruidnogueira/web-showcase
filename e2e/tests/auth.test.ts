import { mockAuthToken, mockUserEmail, mockUserPassword } from 'app/mocks/model/user.mock';
import { e2eConfig } from 'e2e.config';
import { getDocument, queries } from 'playwright-testing-library';
import { setCurrentUser } from 'utils/commands';
import { delay } from 'utils/promise';

const { getByLabelText, getByRole, findByRole } = queries;

test('login', async () => {
  await page.route('**/auth-token', async (route) => {
    await delay(1000);
    return route.fulfill({
      status: 200,
      body: mockAuthToken(),
    });
  });

  await page.goto(e2eConfig.appUrl);
  const document = await getDocument(page);

  await (await getByLabelText(document, /Email/i)).type(mockUserEmail());
  await (await getByLabelText(document, /Password/i)).type(mockUserPassword());
  await (await getByRole(document, 'button', { name: /Log in/i })).click();

  expect(await findByRole(document, 'button', { name: /loading/i })).toBeDefined();
  expect(await findByRole(document, 'button', { name: /Log out/i })).toBeDefined();
});

test('logout', async () => {
  await setCurrentUser(page);

  await page.goto(e2eConfig.appUrl);
  const document = await getDocument(page);

  await (await getByRole(document, 'button', { name: /Log out/i })).click();

  expect(await findByRole(document, 'button', { name: /Log in/i })).toBeDefined();
});
