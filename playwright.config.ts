import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  globalSetup: require.resolve("./global-setup"),
  timeout: 120000,
  expect: {
    timeout: 30000,
  },
  use: {
    // headless: false,
    // viewport: { width: 1280, height: 720 },
    launchOptions: {
      args: ["--single-process", "--no-zygote", "--no-sandbox"],
    },
    actionTimeout: 300000,
    navigationTimeout: 60000,
    ignoreHTTPSErrors: true,
    storageState: "fixtures/authStorageState.json",
    // screenshot: 'only-on-failure',
    // video: "on-first-retry"
  },
  // reporter: [['html', { open: 'always' }]],
  retries: 0,
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] }
    // },
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] }
    // }
  ],
});
