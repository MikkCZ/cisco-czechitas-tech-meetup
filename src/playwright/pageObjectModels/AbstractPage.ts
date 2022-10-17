import { Page, Locator, expect } from "@playwright/test";

export abstract class AbstractPage {
  protected readonly page: Page;
  private readonly jsInitialized: Locator;

  protected constructor(page: Page) {
    this.page = page;
    this.jsInitialized = this.page.locator('body.js');
  }

  async waitForJsInitialised() {
    await this.page.waitForLoadState();
    await expect(this.jsInitialized).toBeVisible();
  }

  abstract goto(): Promise<void>;

  abstract expectToBeThePage(): Promise<void>;
}
