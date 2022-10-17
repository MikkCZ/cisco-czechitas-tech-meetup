import { expect, Page, Locator } from "@playwright/test";

import { AbstractPage } from './AbstractPage';

export class WordPressLoginPage extends AbstractPage {
  private readonly form: Locator;
  readonly userInput: Locator;
  readonly passwordInput: Locator;
  readonly logInButton: Locator;

  constructor(page: Page) {
    super(page);
    this.form = this.page.locator('#loginform');
    this.userInput = this.form.locator('text="Username or Email Address"');
    this.passwordInput = this.form.locator('text="Password"');
    this.logInButton = this.form.locator('text="Log In"');
  }

  async goto() {
    await this.page.goto('/wp-login.php');
  }

  async expectToBeThePage() {
    await this.waitForJsInitialised();
    await expect(this.form).toBeVisible();
  }
}
