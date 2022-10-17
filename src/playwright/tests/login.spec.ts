import { test, expect } from '@playwright/test';

import { configuration } from '../configuration';
import { isDemo } from '../demo';
import { WordPressLoginPage } from '../pageObjectModels/WordPressLoginPage';
import { WordPressAdministration } from '../pageObjectModels/WordPressAdministration';

test.describe('WordPress Login', () => {
  test.skip(isDemo)

  test('redirects to Dashboard after login with username', async ({ page }) => {
    const loginPage = new WordPressLoginPage(page);
    await loginPage.goto();
    await loginPage.expectToBeThePage();

    await loginPage.userInput.fill(configuration.author.username);
    await loginPage.passwordInput.fill(configuration.author.password);
    await loginPage.logInButton.click();

    const administrationPage = new WordPressAdministration(page);
    await administrationPage.expectToBeThePage();
    await expect(administrationPage.title).toHaveText('Dashboard');
  });

  test('redirects to Dashboard after login with email', async ({ page }) => {
    const loginPage = new WordPressLoginPage(page);
    await loginPage.goto();
    await loginPage.expectToBeThePage();

    await loginPage.userInput.fill(configuration.author.email);
    await loginPage.passwordInput.fill(configuration.author.password);
    await loginPage.logInButton.click();

    const administrationPage = new WordPressAdministration(page);
    await administrationPage.expectToBeThePage();
    await expect(administrationPage.title).toHaveText('Dashboard');
  });
});
