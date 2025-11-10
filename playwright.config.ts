import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";

const ENV = process.env.ENV || "dev";

dotenv.config({ path: `.env.${ENV}` });

export default defineConfig({
  testDir: ".tests/**/cases",
  testMatch: "**/*.ts",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["line"],
    [
      "allure-playwright",
      {
        detail: false,
        outputFolder: "allure-results",
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    launchOptions: {
      args: ["--start-maximized"],
    },
    viewport: null,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "setupStandardUser",
      testDir: "./",
      testMatch: "global-setup.ts",
      metadata: {
        sauceUrl: process.env.UI_URL,
        sauceUsername: process.env.SAUCE_STANDARD_USERNAME,
        saucePassword: process.env.SAUCE_PASSWORD,
      },
      use: {
        baseURL: process.env.UI_URL,
      },
    },
    {
      name: "setupProblemUser",
      testDir: "./",
      testMatch: "global-setup.ts",
      metadata: {
        sauceUrl: process.env.UI_URL,
        sauceUsername: process.env.SAUCE_PROBLEM_USERNAME,
        saucePassword: process.env.SAUCE_PASSWORD,
      },
      use: {
        baseURL: process.env.UI_URL,
      },
    },
    {
      name: "setupLockedUser",
      testDir: "./",
      testMatch: "global-setup.ts",
      metadata: {
        sauceUrl: process.env.UI_URL,
        sauceUsername: process.env.SAUCE_LOCKED_USERNAME,
        saucePassword: process.env.SAUCE_PASSWORD,
      },
      use: {
        baseURL: process.env.UI_URL,
      },
    },
    {
      name: "setupApi",
      testDir: "./",
      testMatch: "setupApi.ts",
      metadata: {
        keycloakUrl: process.env.KEYCLOAK_API_URL,
        keycloakUsername: process.env.KEYCLOAK_USERNAME,
        keycloakPassword: process.env.KEYCLOAK_PASSWORD,
      },
      use: {
        baseURL: process.env.UI_URL,
      },
    },
    {
      name: "chromium-standard",
      dependencies: ["setupStandardUser", "setupApi"],
      use: {
        channel: "chrome",
        headless: true,
        baseURL: process.env.UI_URL,
      },
      metadata: {
        sauceUrl: process.env.UI_URL,
        sauceUsername: process.env.SAUCE_STANDARD_USERNAME,
        saucePassword: process.env.SAUCE_PASSWORD,
      },
      testDir: "tests/ui/",
      testMatch: "**/*.ts",
    },
    {
      name: "chromium-problem",
      dependencies: ["setupProblemUser", "setupApi"],
      use: {
        channel: "chrome",
        headless: true,
        baseURL: process.env.UI_URL,
      },
      metadata: {
        sauceUrl: process.env.UI_URL,
        sauceUsername: process.env.SAUCE_PROBLEM_USERNAME,
        saucePassword: process.env.SAUCE_PASSWORD,
      },
      testDir: "tests/ui/",
      testMatch: "**/*.ts",
    },

    {
      name: "chromium-locked",
      dependencies: ["setupLockedUser", "setupApi"],
      use: {
        channel: "chrome",
        headless: true,
        baseURL: process.env.UI_URL,
      },
      metadata: {
        sauceUrl: process.env.UI_URL,
        sauceUsername: process.env.SAUCE_LOCKED_USERNAME,
        saucePassword: process.env.SAUCE_PASSWORD,
      },
      testDir: "tests/ui/",
      testMatch: "**/*.ts",
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    {
      name: "api",
      testDir: "tests/api/cases",
      testMatch: "**/*.ts",
      dependencies: ["setupApi"],
      use: {
        browserName: undefined,
        baseURL: process.env.API_URL,
      },
    },
  ],

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
  //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  // },

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
