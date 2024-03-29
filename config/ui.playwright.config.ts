import {defineConfig, devices} from '@playwright/test';
import 'config/dotenv';
import 'config/matchers';

const rootDir = './../';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: `${rootDir}/tests/ui`,
  globalSetup: `${rootDir}/setup/setup-ui.ts`,
  globalTeardown: `${rootDir}/setup/global-teardown.ts`,
  testMatch: '**/*.spec.ts',
  /* Maximum time one test can run for. */
  timeout: 60 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 20000,
    toHaveScreenshot: {maxDiffPixels: 50},
  },
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 3 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI
    ? [['junit', {outputFile: `${rootDir}/test-results/results.xml`}], ['list']]
    : 'list',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: `${rootDir}/artifacts`,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    permissions: ['clipboard-read', 'clipboard-write'],
    acceptDownloads: true,
    actionTimeout: 20000,
    navigationTimeout: 20000,
    ignoreHTTPSErrors: true,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        headless: !!process.env.CI,
        ...devices['Desktop Chrome'],
        locale: 'en-GB',
      },
    },

    // {
    //   name: 'firefox',
    //   use: {...devices['Desktop Firefox']},
    // },
    //
    // {
    //   name: 'webkit',
    //   use: {...devices['Desktop Safari']},
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ..devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
