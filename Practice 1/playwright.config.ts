import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",

  timeout: 20 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 20000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html"], ["allure-playwright"]],
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  //testIgnore: "**/tests-TDP/**",
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retain-on-failure", //Solo guarda los que fallan se guarda
    testIdAttribute: "id",
    screenshot: "only-on-failure",
    video: 'retain-on-failure',
    ignoreHTTPSErrors: true,
    permissions: ['notifications'],
    //headless: true,//para no mostrar en pantalla lo que se va ejecutando
    //browserName: 'webkit'//solo para definir un unico browser, si quiero correrlo en varios entonces uso la opcion de projects
  },

  /* Configure projects for major browsers */
  projects: [
    // para correc alguno en especifico -> npx playwright test --project= (name)
    // { -- Para correr solo este-> npx playwright test --project=demo --ui
    //   name: 'democonfig',
    //   testDir: './tests-examples',
    //   use: { browserName: 'chromium' }
    // },

    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        viewport: { width: 720, height: 720 }, //some test fails cause some components are not displayed on different viewports
      },
    },
    {
      name: "mobiledemo",
      use: {
        ...devices["iPhone 15 Pro Max"],
      },
    },
    {
      name: "tdp",
      testDir: "./tests/tests-TDP",
      use: { browserName: "chromium"},
      
    },

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
    // }
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
