import { test, expect } from '@playwright/test';

import { configuration } from '../configuration';
import { isDemo } from '../demo';

test.describe('WordPress Login (without page object models)', () => {
  test.skip(isDemo)

  test('redirects to Dashboard after login with username', async ({ page }) => {
    await page.goto('/wp-login.php');
    await page.waitForLoadState();
    await expect(page.locator('body.js')).toBeVisible();

    await page.locator('[type=text]').fill(configuration.author.username);
    await page.locator('[type=password]').fill(configuration.author.password);
    await page.locator('[type=submit]').click();

    await expect(page.locator('#adminmenu')).toBeVisible();
    await expect(page.locator('[role=main] h1')).toHaveText('Dashboard');
  });

  test('redirects to Dashboard after login with email', async ({ page }) => {
    await page.goto('/wp-login.php');
    await page.waitForLoadState();
    await expect(page.locator('body.js')).toBeVisible();

    await page.locator('[type=text]').fill(configuration.author.email);
    await page.locator('[type=password]').fill(configuration.author.password);
    await page.locator('[type=submit]').click();

    await expect(page.locator('#adminmenu')).toBeVisible();
    await expect(page.locator('[role=main] h1')).toHaveText('Dashboard');
  });
});
