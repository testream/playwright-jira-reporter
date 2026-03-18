import { expect, test } from '@playwright/test';

const TESTREAM_HOME_URL = 'https://testream.app';
const TESTREAM_PLAYWRIGHT_DOCS_URL = 'https://docs.testream.app/reporters/playwright';

test.describe('Intentional failures for artifact demo', () => {
  test('fails with an intentionally wrong homepage claim', async ({ page }) => {
    await page.goto(TESTREAM_HOME_URL, { waitUntil: 'domcontentloaded' });

    // This failure is intentional so users can inspect screenshot/video/trace artifacts.
    await expect(page.getByText('Self-hosted only platform', { exact: false })).toBeVisible();
  });

  test('fails with an intentionally wrong reporter install command', async ({ page }) => {
    await page.goto(TESTREAM_PLAYWRIGHT_DOCS_URL, { waitUntil: 'domcontentloaded' });

    // Keeping a second deterministic failure helps demonstrate multiple failed test uploads.
    await expect(page.getByText('npm install --save-dev @testream/invalid-reporter')).toBeVisible();
  });
});
