import { e2eConfig } from 'e2e.config';
import { setLanguage } from 'utils/commands';

beforeEach(async () => {
  await jestPlaywright.resetBrowser();

  await page.goto(e2eConfig.appUrl);
  await setLanguage(page, 'en-GB');
});
