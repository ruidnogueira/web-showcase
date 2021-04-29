import { queries } from 'playwright-testing-library';

const { findByRole, findByLabelText, findByText, queryByText } = queries;

test('visit', async () => {
  await page.goto('http://localhost:3000');
  await page.pause();
});
