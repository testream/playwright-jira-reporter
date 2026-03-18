import { expect, test } from '@playwright/test';

const TESTREAM_HOME_URL = 'https://testream.app';

test.describe('Passing examples for Playwright Jira reporting', () => {
  test('homepage highlights Jira test reporting', async ({ page }) => {
    await page.goto(TESTREAM_HOME_URL, { waitUntil: 'domcontentloaded' });

    await expect(page.getByText('Import CI/CD test results into Jira', { exact: false })).toBeVisible();
  });

  test('homepage links to Playwright reporter docs', async ({ page }) => {
    await page.goto(TESTREAM_HOME_URL, { waitUntil: 'domcontentloaded' });

    const docsLink = page.locator('a[href*="/reporters/playwright"]').first();
    await expect(docsLink).toBeVisible();
    await expect(docsLink).toHaveAttribute('href', /reporters\/playwright/);
  });
});
