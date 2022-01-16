import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  globalSetup: require.resolve('./global-setup'),
  timeout: 10000,
  use: {
    // headless: false,
    // viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    storageState: 'storageState.json'
    // screenshot: 'only-on-failure',
    // video: "on-first-retry"
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] }
    // },
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] }
    // }
  ]
};

export default config;
