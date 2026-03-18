import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';

// Upload only when a key is present — lets contributors run tests without a Testream account.
const uploadEnabled =
  Boolean(process.env.TESTREAM_API_KEY) && process.env.TESTREAM_UPLOAD_ENABLED !== 'false';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    [
      '@testream/playwright-reporter',
      {
        // Store this value in .env locally and in GitHub Actions Secrets for CI.
        apiKey: process.env.TESTREAM_API_KEY,
        uploadEnabled,
        failOnUploadError: false,
        // branch, commitSha, repositoryUrl, buildNumber, and buildUrl are auto-resolved by the reporter.
        screenshot: true,
        annotations: true,
        testType: 'e2e',
        appName: 'playwright-jira-reporter',
        // buildName has no auto default — read it from the GitHub Actions runner env.
        buildName: process.env.GITHUB_WORKFLOW,
        testEnvironment: process.env.TEST_ENV ?? (process.env.CI ? 'ci' : 'local'),
      },
    ],
    ['html', { open: 'never' }],
    ['list'],
  ],
  use: {
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
