import { test, expect } from '@playwright/test';

import { configuration } from '../configuration';
import { WordPressAdministration } from '../pageObjectModels/WordPressAdministration';

test.describe('WordPress Dashboard', () => {
  test.describe('for admin', () => {
    test.use({ storageState: configuration.admin.loggedInState });

    test('renders site health widget', async ({ page }) => {
      const administrationPage = new WordPressAdministration(page);
      await administrationPage.goto();
      await administrationPage.expectToBeThePage();

      await expect(page.locator('h2', { hasText: /^Site Health Status$/ })).toBeVisible();
    });

    test('renders at a glance widget', async ({ page }) => {
      const administrationPage = new WordPressAdministration(page);
      await administrationPage.goto();
      await administrationPage.expectToBeThePage();

      await expect(page.locator('h2', { hasText: /^At a Glance$/ })).toBeVisible();
    });
  });

  test.describe('for author', () => {
    test.use({ storageState: configuration.author.loggedInState });

    test('does not render site health widget', async ({ page }) => {
      const administrationPage = new WordPressAdministration(page);
      await administrationPage.goto();
      await administrationPage.expectToBeThePage();

      await expect(page.locator('body')).not.toContainText('Site Health Status');
    });

    test('renders at a glance widget', async ({ page }) => {
      const administrationPage = new WordPressAdministration(page);
      await administrationPage.goto();
      await administrationPage.expectToBeThePage();

      await expect(page.locator('h2', { hasText: /^At a Glance$/ })).toBeVisible();
    });
  });
});
