import { Fixtures, PlaywrightTestOptions, PlaywrightWorkerOptions } from '@playwright/test';

export type TestFixtures = Fixtures<{}, {}, PlaywrightTestOptions, PlaywrightWorkerOptions>;
