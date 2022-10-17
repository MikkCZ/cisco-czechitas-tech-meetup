import { chromium, Browser, Page } from '@playwright/test';
import * as fs from 'fs';

import { Account, configuration, LOGGED_IN_STATES_DIRECTORY } from './configuration';
import { isDemo } from './demo';
import { WordPressLoginPage } from './pageObjectModels/WordPressLoginPage';

async function logInAndPersistState(browser: Browser, account: Account) {
  let page: Page | undefined;
  try {
    page = await browser.newPage({ baseURL: configuration.baseURL });
    const loginPage = new WordPressLoginPage(page);
    await loginPage.goto();
    await loginPage.expectToBeThePage();

    await loginPage.userInput.fill(account.username);
    await loginPage.passwordInput.fill(account.password);

    await Promise.all([
      page.waitForResponse('/wp-login.php'),
      await loginPage.logInButton.click(),
    ]);
    await page.context().storageState({ path: account.loggedInState });
  } finally {
    await page?.close();
  }
}

async function prepareLoggedInStates() {
  let browser: Browser | undefined;
  try {
    browser = await chromium.launch(isDemo ? { headless: false } : undefined);
    await logInAndPersistState(browser, configuration.admin);
    await logInAndPersistState(browser, configuration.author);
  } finally {
    await browser?.close();
  }
}

function destroyLoggedInStates() {
  fs.rmdirSync(LOGGED_IN_STATES_DIRECTORY, { recursive: true });
}

async function globalSetup(): Promise<() => void> {
  await prepareLoggedInStates();
  return destroyLoggedInStates;
}

export default globalSetup;
