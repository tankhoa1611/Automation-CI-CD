// @ts-check
const { defineConfig, devices } = require('@playwright/test');

// BASE_URL lets you run the same tests against the hosted GitHub Pages site:
//   set BASE_URL=https://tankhoa1611.github.io/Automation-CI-CD/ && npx playwright test
const baseURL = process.env.BASE_URL || 'http://localhost:8080/';

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: 'npm run serve',
        url: 'http://localhost:8080/',
        reuseExistingServer: !process.env.CI,
      },
});
